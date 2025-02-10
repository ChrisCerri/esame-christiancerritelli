import { Header } from "@/components/Header"
import { Outlet } from "react-router"


const WebsiteLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default WebsiteLayout