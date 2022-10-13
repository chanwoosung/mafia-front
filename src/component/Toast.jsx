import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'

export default function Toast() {
  return (
    <>
      <ToastContainer
        toastClassName={() =>
          'px-[14.5px] py-2 bg-[#FAFAFA] shadow-[0px 4px 8px]/[0.16] text-black rounded-lg items-center max-w-max mx-auto my-[2px]'
        }
        autoClose={4000}
        position="bottom-center"
        hideProgressBar={true}
        pauseOnHover={true}
        closeButton={false}
      />
    </>
  )
}
