import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    /*if (!email || !amount) {
      return;
    }*/
    const { email, amount } = await req.json();
    console.log(email, amount);
    const requestData = JSON.stringify({
      email,
      amount,
      callback_url: "http://localhost:3000",
    });
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      body: requestData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TEST_KEY}`,
      },
    });
    const transactionData = await res.json();
    console.log(transactionData);
    return NextResponse.json(transactionData.data.authorization_url);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
