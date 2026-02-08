import { useState } from "react";
import * as RXTabs from "@radix-ui/react-tabs";
import { cx } from "class-variance-authority";
import { Redirect, useLocation } from "wouter";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

import {
    ContentTemplate,
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    RadioGroupItem,
    RadioGroup,
    Label,
    Input,
    Button,
    Icon,
} from "@shared/ui";
import { Branch } from "@shared/lib/branch";
import { CartItem, useCartStore } from "@entities/cart";
import { BACKEND_URL } from "@shared/config";
import { format } from "@shared/lib/format";
import { DeliveryOption, PaymentOption, useCreateOrder } from "@entities/order";

enum OrderFormTab {
    DELIVERY = "DELIVERY",
    PAYMENT = "PAYMENT",
    RECIPIENT = "RECIPIENT",
}

const deliveryMethods = {
    [DeliveryOption.DELIVERY]: "Доставка",
    [DeliveryOption.PICKUP]: "Самовывоз",
};

export interface OrderForm {
    delivery: {
        method: DeliveryOption;
        address?: string;
        floor?: number;
        comment?: string;
    };
    paymentMethod: PaymentOption;
    recipient: {
        fullName: string;
        phone: string;
        email?: string;
        company?: string;
        comment?: string;
    };
}

export const OrderPage: React.FC = () => {
    const [, setLocation] = useLocation();
    const [hasOrdered, setHasOrdered] = useState(false);
    const [openTabs, setOpenTabs] = useState<OrderFormTab[]>([OrderFormTab.DELIVERY]);
    const { register, handleSubmit, control, watch, formState } = useForm<OrderForm>();
    const [formData, setFormData] = useState<BlankForm | null>(null);

    const [deliveryMethod] = watch(["delivery.method"]);
    const { cart, orderedItemsId, reset } = useCartStore();
    const { createOrder } = useCreateOrder();

    const items = cart.filter((i) => orderedItemsId.includes(i.product.id));
    const noItems = items.length === 0;

    if (noItems && !hasOrdered) return <Redirect to="/cart" />;

    const total = items
        .map((i) => i.product.price * i.quantity)
        .reduce((prev, curr) => prev + curr, 0);

    return (
        <ContentTemplate
            breadcrumbs={[
                { label: "Главная", link: "/" },
                { label: "Корзина", link: "/cart" },
                { label: "Оформление заказа", link: "/cart/order" },
            ]}
        >
            <Branch if={hasOrdered}>
                <div>{formData && <OrderSuccess {...formData} />}</div>

                <div className="flex flex-col gap-8">
                    <h1 className="text-3xl text-primary font-semibold">Оформление заказа</h1>

                    <form
                        onSubmit={handleSubmit((form) => {
                            createOrder({
                                productIds: items.map((i) => i.product.id),
                                deliveryAddress: form.delivery.address || "",
                                deliveryFloor: Number(form.delivery.floor || -1),
                                deliveryMethod: form.delivery.method,
                                deliveryComment: form.delivery.comment || "",
                                paymentMethod: form.paymentMethod,
                                recipientFullName: form.recipient.fullName,
                                recipientPhone: form.recipient.phone,
                                recipientComment: form.recipient.comment,
                                recipientCompany: form.recipient.company,
                                recipientEmail: form.recipient.email,
                            }).then((res) => {
                                setHasOrdered(true);
                                const orderPayload = {
                                    recipient: form.recipient,
                                    order: { id: res.data.id, createdAt: new Date() },
                                    delivery: { method: form.delivery.method },
                                    items,
                                };
                                setFormData(orderPayload);
                                localStorage.setItem("orderData", JSON.stringify(orderPayload));

                                // Формируем сообщение для Telegram
                                const itemsList = items.map(i => `• ${i.product.name} (${i.quantity} шт.)`).join('\n');
                                const message = `
📦 <b>НОВЫЙ ЗАКАЗ #${res.data.id}</b>
━━━━━━━━━━━━━━━━━━
👤 <b>Клиент:</b> ${form.recipient.fullName}
📞 <b>Тел:</b> <code>${form.recipient.phone}</code>
🚚 <b>Доставка:</b> ${deliveryMethods[form.delivery.method]}
📍 <b>Адрес:</b> ${form.delivery.address || "Самовывоз"}
💳 <b>Оплата:</b> ${form.paymentMethod}
━━━━━━━━━━━━━━━━━━
🛒 <b>Товары:</b>
${itemsList}

💰 <b>ИТОГО: ${total.toLocaleString()} ₸</b>
                                `;

                                const userId = -5297850513;
                                const botToken = "7505800664:AAFk91B_Y1zsgHtDwIbDF-HbmBDTY2OCZz0";

                                axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                                    chat_id: userId,
                                    text: message,
                                    parse_mode: "HTML",
                                }).catch(err => console.error("TG Error:", err));

                                // Очистка корзины после успеха
                                reset();
                            });
                        })}
                        className="flex gap-12 flex-wrap m-8 sm:flex-col sm:m-0"
                    >
                        <Accordion
                            type="multiple"
                            value={openTabs}
                            onValueChange={(tabs) => setOpenTabs(tabs as OrderFormTab[])}
                            className="flex flex-col flex-1"
                        >
                            <AccordionItem value={OrderFormTab.DELIVERY}>
                                <AccordionTrigger>
                                    <div className="inline-flex gap-4 items-center text-primary font-semibold">
                                        <div className={cx("w-12 inline-flex items-center justify-center aspect-square rounded-full border border-primary transition-colors", { "bg-primary text-white": openTabs.includes(OrderFormTab.DELIVERY) })}>1</div>
                                        <span>Способ доставки</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4">
                                    <Controller
                                        name="delivery.method"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <RXTabs.Root onValueChange={field.onChange} className="flex flex-col">
                                                <RXTabs.List className="flex flex-col gap-2">
                                                    <RXTabs.Trigger value={DeliveryOption.PICKUP} className="inline-flex items-center gap-4">
                                                        <Icon.Circle className={cx("h-2.5 w-2.5", { "fill-primary": deliveryMethod === DeliveryOption.PICKUP })} /> Самовывоз
                                                    </RXTabs.Trigger>
                                                    <RXTabs.Trigger value={DeliveryOption.DELIVERY} className="inline-flex items-center gap-4">
                                                        <Icon.Circle className={cx("h-2.5 w-2.5", { "fill-primary": deliveryMethod === DeliveryOption.DELIVERY })} /> Доставка
                                                    </RXTabs.Trigger>
                                                </RXTabs.List>
                                                {deliveryMethod === DeliveryOption.DELIVERY && (
                                                    <div className="flex flex-col gap-3 mt-4">
                                                        <Label>Адрес доставки*</Label>
                                                        <Input {...register("delivery.address", { required: deliveryMethod === DeliveryOption.DELIVERY })} placeholder="Введите адрес" />
                                                        <Label>Этаж*</Label>
                                                        <Input type="number" {...register("delivery.floor")} placeholder="Введите этаж" />
                                                        <Label>Примечание</Label>
                                                        <Input {...register("delivery.comment")} placeholder="Доп. информация" />
                                                    </div>
                                                )}
                                            </RXTabs.Root>
                                        )}
                                    />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value={OrderFormTab.PAYMENT}>
                                <AccordionTrigger>
                                    <div className="inline-flex gap-4 items-center text-primary font-semibold">
                                        <div className={cx("w-12 inline-flex items-center justify-center aspect-square rounded-full border border-primary transition-colors", { "bg-primary text-white": openTabs.includes(OrderFormTab.PAYMENT) })}>2</div>
                                        <span>Способ оплаты</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <Controller
                                        name="paymentMethod"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <RadioGroup onValueChange={field.onChange} className="flex flex-col gap-3">
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem id="cash" value={PaymentOption.CASH} />
                                                    <Label htmlFor="cash">Наличные в офисе</Label>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem id="card" value={PaymentOption.CARD} />
                                                    <Label htmlFor="card">Оплата по счету</Label>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <RadioGroupItem id="kaspi" value={PaymentOption.KASPI_QR} />
                                                    <Label htmlFor="kaspi">Kaspi QR</Label>
                                                </div>
                                            </RadioGroup>
                                        )}
                                    />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value={OrderFormTab.RECIPIENT}>
                                <AccordionTrigger>
                                    <div className="inline-flex gap-4 items-center text-primary font-semibold">
                                        <div className={cx("w-12 inline-flex items-center justify-center aspect-square rounded-full border border-primary transition-colors", { "bg-primary text-white": openTabs.includes(OrderFormTab.RECIPIENT) })}>3</div>
                                        <span>Данные получателя</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-3">
                                    <Label>ФИО*</Label>
                                    <Input {...register("recipient.fullName", { required: true })} placeholder="Введите ФИО" />
                                    <Label>Телефон*</Label>
                                    <Input {...register("recipient.phone", { required: true })} placeholder="Введите номер" />
                                    <Label>Email</Label>
                                    <Input type="email" {...register("recipient.email")} placeholder="example@mail.com" />
                                    <Label>Компания</Label>
                                    <Input {...register("recipient.company")} placeholder="Название компании" />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <div className="w-[320px] h-fit shadow-even-sm p-6 rounded-lg flex flex-col gap-6">
                            <div className="border-b pb-4 flex flex-col gap-3">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex justify-between text-sm">
                                        <span className="line-clamp-1 w-32">{item.product.name}</span>
                                        <span className="font-semibold">({item.quantity}) {format.number(item.product.price)} ₸</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Итого:</span>
                                <span>{format.number(total)} ₸</span>
                            </div>
                            <Button type="submit" disabled={!formState.isValid || formState.isSubmitting} className="w-full">
                                {formState.isSubmitting ? "Обработка..." : "Оформить заказ"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Branch>
        </ContentTemplate>
    );
};

export interface BlankForm {
    recipient: {
        fullName: string;
        phone: string;
        email?: string;
        company?: string;
    };
    order: {
        id: number;
        createdAt: Date;
    };
    delivery: {
        method: DeliveryOption;
    };
    items: CartItem[];
}
const OrderSuccess: React.FC<BlankForm> = (props) => {
    const [showBlank, setShowBlank] = useState(false);

    return (
        <Branch if={showBlank}>
            <OrderDisplay {...props} />

            <div className="flex flex-col gap-8">
                <h1 className="text-3xl text-primary font-semibold">
                    Спасибо за заказ
                </h1>

                <div className="flex flex-col gap-6">
                    <p>
                        <span className="font-semibold">
                            Благодарим за Ваш заказ!
                        </span>{" "}
                        В ближайшее время наши специалисты свяжутся с Вами для
                        уточнения деталей заказа. Если заказ сделан в нерабочее
                        время, то мы перезвоним в первый рабочий день.
                    </p>

                    <ul className="flex flex-col">
                        <li className="inline-flex items-center gap-2">
                            <span>Номер Вашего заказа: </span>
                            <span className="font-semibold">
                                {props.order.id}
                            </span>
                        </li>

                        <li className="inline-flex items-center gap-2">
                            <span>Дата заказа: </span>
                            <span className="font-semibold">
                                {props.order.createdAt.toLocaleString()}
                            </span>
                        </li>

                        <li className="inline-flex items-center gap-2">
                            <span>Доставка: </span>
                            <span className="font-semibold">бесплатно</span>
                        </li>

                        <li className="inline-flex items-center gap-2">
                            <span>Сумма к оплате: </span>
                            <span className="font-semibold">
                                {format.number(
                                    props.items
                                        .map(
                                            (i) => i.quantity * i.product.price,
                                        )
                                        .reduce(
                                            (prev, total) => prev + total,
                                            0,
                                        ),
                                )}{" "}
                                ₸
                            </span>
                        </li>
                    </ul>

                    <Button
                        onClick={() => {
                            setShowBlank(true);
                        }}
                        className="w-fit"
                        size="small"
                    >
                        Распечатать бланк заказа
                    </Button>
                </div>
            </div>
        </Branch>
    );
};

const OrderDisplay: React.FC<BlankForm> = ({
    recipient,
    order,
    delivery,
    items,
}) => {
    const total = items
        .map((i) => i.quantity * i.product.price)
        .reduce((prev, total) => prev + total, 0);

    return (
        <div className="flex flex-col gap-12">
            <h1 className="text-3xl text-primary font-semibold">Ваш заказ</h1>

            <div className="flex flex-col gap-8">
                <InfoSection
                    title="Личные данные"
                    properties={[
                        {
                            name: "ФИО",
                            value: recipient.fullName,
                        },
                        {
                            name: "Телефон",
                            value: recipient.phone,
                        },
                        {
                            name: "Почта",
                            value: recipient.email || "—",
                        },
                        {
                            name: "Компания",
                            value: recipient.company || "—",
                        },
                    ]}
                />

                <InfoSection
                    title="Cведения о заказе"
                    properties={[
                        {
                            name: "Номер заказа",
                            value: order.id.toString() || "_",
                        },
                        {
                            name: "Статус заказа",
                            value: "Новый",
                        },
                        {
                            name: "Создан",
                            value: order.createdAt.toLocaleString(),
                        },
                    ]}
                />

                <InfoSection
                    title="Cведения о доставке"
                    properties={[
                        {
                            name: "Доставка",
                            value: {
                                [DeliveryOption.DELIVERY]: "Доставка",
                                [DeliveryOption.PICKUP]: "Самовывоз",
                            }[delivery.method],
                        },
                        {
                            name: "Стоимость",
                            value: "Бесплатно",
                        },
                    ]}
                />

                <div className="flex flex-col border border-paper-contrast/25 rounded-xl">
                    <div className="flex flex-col">
                        <div className="flex items-center text-center py-6 border-b border-paper-contrast/10">
                            <div className="w-[30%]">Название</div>

                            <div className="w-[20%]">Цена, ₸</div>

                            <div className="w-[20%]">Со скидкой, ₸</div>

                            <div className="w-[10%]">Кол-во</div>

                            <div className="w-[20%]">Сумма, ₸</div>
                        </div>

                        <div className="flex flex-col">
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex items-center py-6 border-b border-paper-contrast/10"
                                >
                                    <div className="w-[30%] inline-flex justify-center px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`${BACKEND_URL}${item.product.photoPath}`}
                                                alt="Фотка"
                                                className="max-w-12 max-h-12"
                                            />

                                            <span className="text-primary font-semibold line-clamp-2">
                                                {item.product.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-[20%] text-center">
                                        <span>
                                            {format.number(item.product.price)}{" "}
                                            ₸
                                        </span>
                                    </div>

                                    <div className="w-[20%] text-center">
                                        <span>
                                            {format.number(item.product.price)}{" "}
                                            ₸
                                        </span>
                                    </div>

                                    <div className="w-[10%] text-center">
                                        <span>{item.quantity}</span>
                                    </div>

                                    <div className="w-[20%] text-center">
                                        <span>
                                            {format.number(
                                                item.product.price *
                                                    item.quantity,
                                            )}{" "}
                                            ₸
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between font-semibold p-6">
                        <span>Итого</span>

                        <span>{format.number(total)} ₸</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoSection: React.FC<{
    title: string;
    properties: Array<{
        name: string;
        value: string;
    }>;
}> = ({title, properties}) => {
    return (
        <div className="flex flex-col rounded-lg border border-paper-contrast/25 text-paper-contrast/70 p-8 relative">
            <span className="absolute left-8 top-0 -translate-y-1/2 z-10 bg-paper-primary px-4">
                {title}
            </span>

            <div className="flex flex-col gap-4">
                {properties.map((property) => (
                    <div className="flex items-center gap-2">
                        <span className="w-52 text-paper-contrast/70">
                            {property.name}
                        </span>

                        <span className="font-semibold">{property.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
