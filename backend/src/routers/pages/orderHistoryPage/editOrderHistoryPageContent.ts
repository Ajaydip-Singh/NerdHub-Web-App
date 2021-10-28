import express, { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import OrderHistoryPageContent from '../../../models/orderHistoryPageModel';
import logger from '../../../utils/logger';

const router = express.Router();

router.put(
  '/',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const orderHistoryPageContent = await OrderHistoryPageContent.findOne();

    orderHistoryPageContent.orderHistoryMainHeading =
      req.body.orderHistoryMainHeading ||
      orderHistoryPageContent.orderHistoryMainHeading;
    orderHistoryPageContent.orderHistoryBackgroundImage =
      req.body.orderHistoryBackgroundImage ||
      orderHistoryPageContent.orderHistoryBackgroundImage;
    orderHistoryPageContent.noOrdersAvailable =
      req.body.noOrdersAvailable || orderHistoryPageContent.noOrdersAvailable;
    orderHistoryPageContent.ordersMainHeading =
      req.body.ordersMainHeading || orderHistoryPageContent.ordersMainHeading;
    orderHistoryPageContent.eventsMainHeading =
      req.body.eventsMainHeading || orderHistoryPageContent.eventsMainHeading;
    orderHistoryPageContent.tableBorderColor =
      req.body.tableBorderColor || orderHistoryPageContent.tableBorderColor;
    orderHistoryPageContent.tableEvenRowBackgroundColor =
      req.body.tableEvenRowBackgroundColor ||
      orderHistoryPageContent.tableEvenRowBackgroundColor;
    orderHistoryPageContent.tableEvenRowTextColor =
      req.body.tableEvenRowTextColor ||
      orderHistoryPageContent.tableEvenRowTextColor;
    orderHistoryPageContent.tableOddRowBackgroundColor =
      req.body.tableOddRowBackgroundColor ||
      orderHistoryPageContent.tableOddRowBackgroundColor;
    orderHistoryPageContent.tableOddRowTextColor =
      req.body.tableOddRowTextColor ||
      orderHistoryPageContent.tableOddRowTextColor;
    orderHistoryPageContent.checkoutButtonTextColor =
      req.body.checkoutButtonTextColor ||
      orderHistoryPageContent.checkoutButtonTextColor;
    orderHistoryPageContent.checkoutButtonBackgroundColor =
      req.body.checkoutButtonBackgroundColor ||
      orderHistoryPageContent.checkoutButtonBackgroundColor;
    orderHistoryPageContent.checkoutButtonBorderColor =
      req.body.checkoutButtonBorderColor ||
      orderHistoryPageContent.checkoutButtonBorderColor;

    const updatedOrderHistoryPageContent = await orderHistoryPageContent.save();

    res.status(200).send(updatedOrderHistoryPageContent);

    logger.info(
      `${req.ip} : ${req.method} : ${req.originalUrl} : ${res.statusCode} : Updated order history page content succesfully.`
    );
  })
);

export default router;
