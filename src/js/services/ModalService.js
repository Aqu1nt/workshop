import module from "../Module"

export class ModalService
{
    alert(text)
    {
        alert(text);
    }
}

module.service("ModalService", ModalService);