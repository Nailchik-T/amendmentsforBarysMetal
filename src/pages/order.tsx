import {useState} from "react";
import * as RXTabs from "@radix-ui/react-tabs";
import {cx} from "class-variance-authority";
import {Redirect, useLocation} from "wouter";
import {Controller, useForm} from "react-hook-form";

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
import {Branch} from "@shared/lib/branch";
import {CartItem, useCartStore} from "@entities/cart";
import {BACKEND_URL} from "@shared/config";
import {format} from "@shared/lib/format";
import {DeliveryOption, PaymentOption, useCreateOrder} from "@entities/order";
import axios from "axios";

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
    const [location, setLocation] = useLocation();

    const [hasOrdered, setHasOrdered] = useState(false);

    const [openTabs, setOpenTabs] = useState<OrderFormTab[]>([
        OrderFormTab.DELIVERY,
    ]);

    const {register, handleSubmit, control, watch, formState} =
        useForm<OrderForm>();

    const [formData, setFormData] = useState<BlankForm | null>(null);

    const [deliveryMethod] = watch(["delivery.method"]);

    const {cart, orderedItemsId, reset} = useCartStore();

    const {createOrder} = useCreateOrder();

    const items = cart.filter((i) => orderedItemsId.includes(i.product.id));

    const noItems = items.length === 0;

    if (noItems) return <Redirect to="/order" />;

    const total = items
        .map((i) => i.product.price * i.quantity)
        .reduce((prev, total) => prev + total, 0);

    return (
        <ContentTemplate
            breadcrumbs={[
                {
                    label: "Главная",
                    link: "/",
                },
                {
                    label: "Корзина",
                    link: "/cart",
                },
                {
                    label: "Оформление заказа",
                    link: "/cart/order",
                },
            ]}
        >
            <Branch if={hasOrdered}>
                <div>{formData && <OrderSuccess {...formData} />}</div>

                <div className="flex flex-col gap-8">
                    <h1 className="text-3xl text-primary font-semibold">
                        Оформление заказа
                    </h1>

                    <form
                        onSubmit={handleSubmit((form) => {
                            createOrder({
                                productIds: items.map((i) => i.product.id),
                                deliveryAddress: form.delivery.address || "",
                                deliveryFloor: Number(
                                    form.delivery.floor || -1,
                                ),
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

                                setFormData({
                                    recipient: form.recipient,
                                    order: {
                                        id: res.data.id,
                                        createdAt: new Date(),
                                    },
                                    delivery: {
                                        method: form.delivery.method,
                                    },
                                    items,
                                });
                                localStorage.setItem(
                                    "orderData",
                                    JSON.stringify({
                                        recipient: form.recipient,
                                        order: {
                                            id: res.data.id,
                                            createdAt: new Date(),
                                        },
                                        delivery: {
                                            method: form.delivery.method,
                                        },
                                        items,
                                    }),
                                );
                                const message = `
            Order ID: ${res.data.id}
            Recipient: ${form.recipient.fullName}
            Phone: ${form.recipient.phone}
            Delivery Method: ${deliveryMethods[form.delivery.method]}
            Address: ${form.delivery.address}
            Products:${items.map((i) => i.product.name)}
            Total: ${total.toLocaleString()} ₸
        `;
                                const userId = 936712677;

                                axios.post(
                                    `https://api.telegram.org/bot7505800664:AAFk91B_Y1zsgHtDwIbDF-HbmBDTY2OCZz0/sendMessage`,
                                    {
                                        chat_id: userId,
                                        text: message,
                                    },
                                );
                            });
                        })}
                        className="flex gap-12 flex-wrap m-8 sm:flex-col sm:items-center sm:justify-items-center  sm:m-0"
                    >
                        <Accordion
                            type="multiple"
                            value={openTabs}
                            onValueChange={(tabs) => {
                                setOpenTabs(tabs as OrderFormTab[]);
                            }}
                            className="flex flex-col flex-1"
                        >
                            <AccordionItem value={OrderFormTab.DELIVERY}>
                                <AccordionTrigger>
                                    <div className="inline-flex gap-4 items-center text-primary font-semibold">
                                        <div
                                            className={cx(
                                                "w-12 inline-flex items-center justify-center aspect-square rounded-full border border-primary text-primary transition-colors duration-200",
                                                {
                                                    "bg-primary text-primary-contrast":
                                                        openTabs.includes(
                                                            OrderFormTab.DELIVERY,
                                                        ),
                                                },
                                            )}
                                        >
                                            1
                                        </div>

                                        <span>Выберите способ доставки</span>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="flex flex-col gap-4">
                                    <Controller
                                        name="delivery.method"
                                        control={control}
                                        rules={{required: true}}
                                        render={({field}) => (
                                            <RXTabs.Root
                                                id="delivery-method-tabs-root"
                                                className="flex flex-col"
                                                onValueChange={(value) => {
                                                    field.onChange(
                                                        value as DeliveryOption,
                                                    );
                                                }}
                                            >
                                                <RXTabs.List className="flex flex-col gap-2">
                                                    <RXTabs.Trigger
                                                        value={
                                                            DeliveryOption.PICKUP
                                                        }
                                                        className="inline-flex items-center gap-4"
                                                    >
                                                        <label
                                                            htmlFor={
                                                                DeliveryOption.PICKUP
                                                            }
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Icon.Circle
                                                                className={cx(
                                                                    "h-2.5 w-2.5",
                                                                    {
                                                                        "fill-primary":
                                                                            deliveryMethod ===
                                                                            DeliveryOption.PICKUP,
                                                                    },
                                                                )}
                                                            />{" "}
                                                            Самовывоз
                                                        </label>
                                                    </RXTabs.Trigger>

                                                    <RXTabs.Trigger
                                                        value={
                                                            DeliveryOption.DELIVERY
                                                        }
                                                        className="inline-flex items-center gap-4"
                                                    >
                                                        <label
                                                            htmlFor={
                                                                DeliveryOption.DELIVERY
                                                            }
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Icon.Circle
                                                                className={cx(
                                                                    "h-2.5 w-2.5",
                                                                    {
                                                                        "fill-primary":
                                                                            deliveryMethod ===
                                                                            DeliveryOption.DELIVERY,
                                                                    },
                                                                )}
                                                            />{" "}
                                                            Доставка
                                                        </label>
                                                    </RXTabs.Trigger>
                                                </RXTabs.List>

                                                {deliveryMethod ===
                                                    DeliveryOption.DELIVERY && (
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex flex-col mt-4">
                                                            <span>
                                                                По г. Алматы:
                                                                1-2 рабочих дня.
                                                            </span>

                                                            <span>
                                                                В регионы: 2-10
                                                                рабочих дней.
                                                            </span>
                                                        </div>

                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex flex-col gap-1">
                                                                <Label htmlFor="address">
                                                                    Адрес
                                                                    доставки
                                                                    <span className="text-[#f24e4e] font-bold">
                                                                        *
                                                                    </span>
                                                                </Label>

                                                                <Input
                                                                    id="address"
                                                                    placeholder="Введите адрес"
                                                                    type="text"
                                                                    {...register(
                                                                        "delivery.address",
                                                                        {},
                                                                    )}
                                                                />
                                                            </div>

                                                            <div className="flex flex-col gap-1">
                                                                <Label htmlFor="floor">
                                                                    Этаж дома
                                                                    <span className="text-[#f24e4e] font-bold">
                                                                        *
                                                                    </span>
                                                                </Label>

                                                                <Input
                                                                    id="floor"
                                                                    placeholder="Введите этаж"
                                                                    type="number"
                                                                    {...register(
                                                                        "delivery.floor",
                                                                        {},
                                                                    )}
                                                                />
                                                            </div>

                                                            <div className="flex flex-col gap-1">
                                                                <Label htmlFor="comment">
                                                                    Примечание к
                                                                    заказу
                                                                </Label>

                                                                <Input
                                                                    id="comment"
                                                                    placeholder="Введите примечание"
                                                                    {...register(
                                                                        "delivery.comment",
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
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
                                        <div
                                            className={cx(
                                                "w-12 inline-flex items-center justify-center aspect-square rounded-full border border-primary text-primary transition-colors duration-200",
                                                {
                                                    "bg-primary text-primary-contrast":
                                                        openTabs.includes(
                                                            OrderFormTab.PAYMENT,
                                                        ),
                                                },
                                            )}
                                        >
                                            2
                                        </div>

                                        <span>Способ оплаты</span>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent>
                                    <Controller
                                        name="paymentMethod"
                                        control={control}
                                        rules={{required: true}}
                                        render={({field}) => (
                                            <RadioGroup
                                                {...field}
                                                onValueChange={(value) => {
                                                    field.onChange(
                                                        value as PaymentOption,
                                                    );
                                                }}
                                            >
                                                <div className="inline-flex items-center gap-4">
                                                    <RadioGroupItem
                                                        id={PaymentOption.CASH}
                                                        value={
                                                            PaymentOption.CASH
                                                        }
                                                    />

                                                    <Label
                                                        htmlFor={
                                                            PaymentOption.CASH
                                                        }
                                                    >
                                                        Наличная оплата в офисе
                                                        компании
                                                    </Label>
                                                </div>

                                                <div className="inline-flex items-center gap-4">
                                                    <RadioGroupItem
                                                        id={PaymentOption.CARD}
                                                        value={
                                                            PaymentOption.CARD
                                                        }
                                                    />

                                                    <Label
                                                        htmlFor={
                                                            PaymentOption.CARD
                                                        }
                                                    >
                                                        Безналичная оплата на
                                                        оснавании счета
                                                    </Label>
                                                </div>

                                                <div className="inline-flex items-center gap-4">
                                                    <RadioGroupItem
                                                        id={
                                                            PaymentOption.KASPI_QR
                                                        }
                                                        value={
                                                            PaymentOption.KASPI_QR
                                                        }
                                                    />

                                                    <Label
                                                        htmlFor={
                                                            PaymentOption.KASPI_QR
                                                        }
                                                    >
                                                        Kaspi QR
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        )}
                                    />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value={OrderFormTab.RECIPIENT}>
                                <AccordionTrigger>
                                    <div className="inline-flex gap-4 items-center text-primary font-semibold">
                                        <div
                                            className={cx(
                                                "w-12 inline-flex items-center justify-center aspect-square rounded-full border border-primary text-primary transition-colors duration-200",
                                                {
                                                    "bg-primary text-primary-contrast":
                                                        openTabs.includes(
                                                            OrderFormTab.RECIPIENT,
                                                        ),
                                                },
                                            )}
                                        >
                                            3
                                        </div>

                                        <span>Данные получателя</span>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent>
                                    <form className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-1">
                                            <Label htmlFor="fullName">
                                                ФИО
                                                <span className="text-[#f24e4e] font-bold">
                                                    *
                                                </span>
                                            </Label>

                                            <Input
                                                id="fullName"
                                                placeholder="Введите ФИО"
                                                type="text"
                                                {...register(
                                                    "recipient.fullName",
                                                    {
                                                        required: true,
                                                    },
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <Label htmlFor="phone">
                                                Номер телефона
                                                <span className="text-[#f24e4e] font-bold">
                                                    *
                                                </span>
                                            </Label>

                                            <Input
                                                id="phone"
                                                type="text"
                                                placeholder="Введите номер телефона"
                                                {...register(
                                                    "recipient.phone",
                                                    {
                                                        required: true,
                                                    },
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <Label htmlFor="email">Почта</Label>

                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Введите почту"
                                                {...register("recipient.email")}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <Label htmlFor="company">
                                                Компания
                                            </Label>

                                            <Input
                                                id="company"
                                                placeholder="Введите компанию"
                                                type="text"
                                                {...register(
                                                    "recipient.company",
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <Label htmlFor="comment">
                                                Дополнительная информация
                                            </Label>

                                            <Input
                                                id="comment"
                                                type="text"
                                                placeholder="Введите доп. информацию"
                                                {...register(
                                                    "recipient.comment",
                                                )}
                                            />
                                        </div>
                                    </form>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <div className="w-[320px] h-fit flex flex-col gap-6 shadow-even-sm p-6 rounded-lg">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col border-b border-paper-contrast/25 gap-3 pb-6">
                                    {items.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`${BACKEND_URL}${item.product.photoPath}`}
                                                    alt="Фотка"
                                                    className="max-w-12 max-h-12"
                                                />

                                                <span className="text-primary font-semibold text-sm line-clamp-2 w-[130px] overflow-hidden text-ellipsis break-words">
                                                    {item.product.name}
                                                </span>
                                            </div>

                                            <span className="font-semibold text-sm text-right overflow-hidden text-ellipsis whitespace-nowrap min-w-20">
                                                ({item.quantity}){" "}
                                                {format.number(
                                                    item.product.price,
                                                )}{" "}
                                                ₸
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-paper-contrast/70">
                                        Итого:
                                    </span>

                                    <span className="font-semibold">
                                        {format.number(total)} ₸
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                size="small"
                                className="w-fit mx-auto"
                                disabled={!formState.isValid}
                            >
                                Оформить заказ
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
