"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Payment = () => {
  /*  const response = await initializePayment("antonymbeka@gmail.com", 55);
  const transactionDetails = await response.json();
  if (transactionDetails) {
    console.log(transactionDetails.data.authorization_url);
    redirect(transactionDetails.data.authorization_url);
  }*/
  const router = useRouter();
  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/payments", {
      method: "POST",
      body: JSON.stringify({
        amount: 15,
        email: "antonymbeka@gmail.com",
      }),
    });

    const redirectUrl = await res.json();
    if (redirectUrl) {
      console.log(redirectUrl);
      router.push(redirectUrl);
    }
  };

  return (
    <div>
      <Button variant="amber" onClick={handleSubmit}>
        Pay
      </Button>
    </div>
  );
};

export { Payment };
