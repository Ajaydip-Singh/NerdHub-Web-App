import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import express from 'express';
import { PesaPalClient } from '../../utils/pesaPal';

const router = express.Router();

router.post(
  '/order/post',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const Amount = req.body.Amount;
    const Description = req.body.Description;
    const Type = req.body.Type;
    const Reference = req.body.Reference;
    const Email = req.body.Email;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const LineItems = req.body.LineItems;

    const client = new PesaPalClient();
    const response = await client.postDirectOrder({
      Amount,
      Description,
      Type,
      Reference,
      Email,
      FirstName,
      LastName,
      LineItems
    });
    res.send(response);
  })
);

export default router;
