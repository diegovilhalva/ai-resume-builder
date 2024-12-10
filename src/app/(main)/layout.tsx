import PremiumModal from "@/components/premium/PremiumModal"
import Navbar from "./Navbar"
import { auth } from "@clerk/nextjs/server"
import { getUserSubscriptionLevel } from "@/lib/subscriptions"
import SubscriptionLevelProvider from "./SubscriptionLevelProvider"


const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId)


  return (
    <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        <PremiumModal />
      </div>
    </SubscriptionLevelProvider>
  )
}

export default Layout