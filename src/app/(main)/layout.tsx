import PremiumModal from "@/components/premium/PremiumModal"
import Navbar from "./Navbar"


const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        <PremiumModal />
    </div>
  )
}

export default Layout