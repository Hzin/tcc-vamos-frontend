import { useEffect, useState } from "react";

interface ComponentProps {
  color?: 'black' | 'gray';
}

export const Separator = (props: ComponentProps) => {
  const [cssClass, setCssClass] = useState('')

  useEffect(() => {
    switch (props.color) {
      case 'black':
        setCssClass('')
        break;
      case 'gray':
        setCssClass('border-gray-200')
        break;

      default:
        break;
    }
  })

  return (
    <hr className={`mt-2 mb-2 ${cssClass}`} />
  )
}