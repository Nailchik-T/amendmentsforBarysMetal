import {useCreateInquiry, useInquiryStore} from "@entities/inquiry";
import {Button, Input, Label} from "@shared/ui";
import {Dialog, DialogContent} from "@shared/ui/dialogSlider";
import ReactDOM from "react-dom";
import {useForm} from "react-hook-form";

interface IDialog {
    isInquiryModalOpen: boolean;
    setIsInquiryModalOpen: (value: boolean) => void;
}
const DialogModal = ({isInquiryModalOpen, setIsInquiryModalOpen}: IDialog) => {
    const {sentInquiry, setSentInquiry} = useInquiryStore();

    const {createInquiry} = useCreateInquiry();

    const {register, handleSubmit} = useForm<{
        fullName: string;
        phone: string;
        comment?: string;
    }>();
    return ReactDOM.createPortal(
        <Dialog open={isInquiryModalOpen} onOpenChange={setIsInquiryModalOpen}>
            <DialogContent className="bg-paper-primary rounded-lg p-8">
                <form
                    onSubmit={handleSubmit((form) => {
                        createInquiry({
                            fullName: form.fullName,
                            number: form.phone,
                            comment: form.comment,
                        });

                        setSentInquiry(true);
                        setIsInquiryModalOpen(false);
                    })}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="fullName">
                            ФИО
                            <span className="text-[#f24e4e] font-bold">*</span>
                        </Label>

                        <Input
                            id="fullName"
                            placeholder="Введите ФИО"
                            type="text"
                            {...register("fullName", {
                                required: true,
                            })}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="phone">
                            Номер телефона
                            <span className="text-[#f24e4e] font-bold">*</span>
                        </Label>

                        <Input
                            id="phone"
                            placeholder="Введите номер"
                            type="text"
                            {...register("phone", {
                                required: true,
                            })}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="comment">Комментарий к заказу</Label>

                        <Input
                            id="comment"
                            placeholder="Введите комментарий"
                            type="text"
                            {...register("comment", {
                                required: true,
                            })}
                        />
                    </div>

                    <Button type="submit" className="mt-4">
                        Отправить
                    </Button>
                </form>
            </DialogContent>
        </Dialog>,
        document.body,
    );
};
export default DialogModal;
