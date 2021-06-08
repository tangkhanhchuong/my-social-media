import { useState } from 'react'

const usePopupButton = () => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    return { modal, toggle }
}

export default usePopupButton
