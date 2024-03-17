//@ts-nocheck

import { NextResponse } from "next/server";
//import { verify } from "@/utilities/verify-paystack-token";

export async function POST(req: Request) {
  try {
    const eventData = await req.json();

    //const signature = req.headers["x-paystack-signature"];

    /*if (!verify(eventData, signature)) {
      return new NextResponse("Unable to handle the request", { status: 400 });
    }*/

    if (eventData.event === "charge.success") {
      const transactionId = eventData.data.id;
      // Process the successful transaction to maybe fund wallet and update your WalletModel
      console.log(`Transaction ${transactionId} was successful`);
    }

    return new NextResponse("ok", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
