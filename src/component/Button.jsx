
function buttonHeight(size) {
  if (size === 'xs') return ` h-[35px] text-${size} `
  else if (size === 'sm') return ` h-[41px] text-${size} `
  else if (size === 'base') return ` h-[44px] text-${size} `
  else if (size === 'lg') return ' h-[52px] text-base '
}

function buttonThemeCSS(theme) {
  if (theme === 'Filled') return ' bg-bgQuarternary hover:bg-bgButtonHover '
  else if (theme === 'Outlined') return ' border border-twPaletteGray400 hover:bg-bgOutlineHover '
  else if (theme === 'Accent') return ' bg-bgAccent '
}

function buttonDisable(disable) {
  if (disable) return ' bg-bgQuarternary opacity-30 '
}

function buttonTextColor(theme, color) {
  if (color !== undefined) {
    return color
  }

  if (theme === 'Accent') {
    return 'text-black'
  }

  return 'text-textPrimary'
}

function cx (classes)  {
  return classes.filter(Boolean).join(' ')
}


export default function Button({
  onClick,
  text = '',
  size = 'base',
  theme = 'Filled',
  className = '',
  color = undefined,
  disable = false,
  type = 'button',
}) {
  const defaultButtonClass = 'w-full rounded font-medium cursor-pointer leading-normal shadow-sm '

  return (
    <button
      className={cx(
        [className,
        buttonTextColor(theme, color),
        buttonHeight(size),
        defaultButtonClass,
        buttonThemeCSS(theme),
        buttonDisable(disable),]
      )}
      type={type}
      disabled={disable}
      onClick={onClick}>
      {text}
    </button>
  )
}
