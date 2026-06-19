const express = require("express");

const Order = require("../models/Order");

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const router = express.Router();

/*
========================
CREATE ORDER
========================
*/

router.post(
    "/",
    authMiddleware,
    async (req, res) => {

        try {

            const order =
            await Order.create({

                user: req.user.id,

                products:
                req.body.products,

                totalAmount:
                req.body.totalAmount,

                shippingAddress:
                req.body.shippingAddress,

                paymentMethod:
                req.body.paymentMethod

            });

            res.status(201).json({
                success: true,
                order
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

});

/*
========================
GET MY ORDERS
========================
*/

router.get(
    "/my-orders",
    authMiddleware,
    async (req, res) => {

        try {

            const orders =
            await Order.find({
                user: req.user.id
            })
            .populate("products.product");

            res.json(orders);

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

});

/*
========================
GET ALL ORDERS
========================
*/

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const orders =
            await Order.find()
            .populate("user")
            .populate("products.product");

            res.json(orders);

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

});

/*
========================
UPDATE ORDER STATUS
========================
*/

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            const order =
            await Order.findByIdAndUpdate(
                req.params.id,
                {
                    orderStatus:
                    req.body.orderStatus
                },
                {
                    new: true
                }
            );

            res.json(order);

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

});

/*
========================
DELETE ORDER
========================
*/

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {

        try {

            await Order.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                "Order deleted successfully"
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

});

module.exports = router;