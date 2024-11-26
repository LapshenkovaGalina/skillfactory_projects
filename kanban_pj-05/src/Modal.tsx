import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import MyDropDownMenu from "./MyDropDownMenu";

function Modal(props: PropsWithChildren) {
    return createPortal((
        <MyDropDownMenu/>
    ), document.body);
}

export default Modal;