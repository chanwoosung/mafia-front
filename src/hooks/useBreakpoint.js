import { useMediaQuery } from "react-responsive"

export default function useBreakpoint() {
  const isMD = useMediaQuery({query:'(min-width: 768px)'});
  const isLG = useMediaQuery({query:'(min-width: 1024px)'});
  const isXL = useMediaQuery({query:'(min-width: 1280px)'});
  const is2XL = useMediaQuery({query:'(min-width: 1440px)'});
  const is3XL = useMediaQuery({query:'(min-width: 1600px)'});
  const is4XL = useMediaQuery({query:'(min-width: 1920px)'});
  return {
    isMD,
    isLG,
    isXL,
    is2XL,
    is3XL,
    is4XL,
  }
}
