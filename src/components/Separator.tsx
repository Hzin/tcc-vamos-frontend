import { useEffect, useState } from "react";

interface ComponentProps {
  color?: 'light' | 'dark';
}

export const Separator = (props: ComponentProps) => {
  const [cssClass, setCssClass] = useState('')

  useEffect(() => {
    switch (props.color) {
      case 'dark':
        setCssClass('border-gray-200')
        break;
      case 'light':
        setCssClass('border-white-20')
        break;

      default:
        break;
    }
  }, [])

  return (
    <hr className={`mt-2 mb-2 ${cssClass}`} />
  )
}