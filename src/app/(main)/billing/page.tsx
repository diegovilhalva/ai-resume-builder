import prisma from "@/lib/prisma"
import stripe from "@/lib/stripe"
import { auth } from "@clerk/nextjs/server"
import { Metadata } from "next"
import Stripe from "stripe"
import GetSubscriptionButton from "./GetSubscriptionButton"
import { formatDate } from "date-fns"
import ManageSubscriptionButton from "./ManageSubscriptionButton"

export const metada: Metadata = {
  title: "Billing"
}

const Page = async () => {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const subscription = await prisma.userSubscription.findUnique({
    where:{userId}
  })

  const priceInfo = subscription ? await stripe.prices.retrieve(subscription.stripePriceId,{
    expand:["product"]
  })
  :null
  return (
    <main className="max-w-7xl mx-auto w-full space-y-6 px-3 py-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p className="">
        Your current plan:{" "}
        <span className="font-bold">{priceInfo ? (priceInfo.product as Stripe.Product).name : "free"}</span>
      </p>
      
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription will ne cancelled on:{""} 
              {formatDate(subscription.stripeCurrentPeriodEnd,"MMMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ): (
        <GetSubscriptionButton/>
      )}
      
    </main>
  )
}

export default Page