import * as RXTabs from "@radix-ui/react-tabs";
import {useState} from "react";
import {Link, useParams} from "wouter";

import {useCartStore} from "@entities/cart";
import {useProduct} from "@entities/product";
import kaspi from "@shared/assets/kaspi.png";
import {BACKEND_URL} from "@shared/config";
import {Branch} from "@shared/lib/branch";
import {format} from "@shared/lib/format";
import {Button, ContentTemplate, Icon} from "@shared/ui";
import {useNavigate} from "react-router-dom";

enum ProductTab {
    CHARACTERISTICS,
}

export const ProductPage: React.FC = () => {
    const navigate = useNavigate();
    const {productId} = useParams() as {productId: string};

    const {product} = useProduct({
        id: Number(productId),
    });

    const {cart, addProduct} = useCartStore();

    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const cartItem = cart.find((i) => i.product.id === product.id);

    const inCart = !!cartItem;

    return (
        <ContentTemplate
            breadcrumbs={[
                {
                    label: "Главная",
                    link: "/",
                },
                {
                    label: "Каталог",
                    link: "/categories",
                },
                {
                    label: product.name,
                    link: `/products/${product?.id}`,
                },
            ]}
        >
            <div className="flex flex-col flex-wrap gap-6 ">
                <div className="flex gap-12 sm:gap-3 sm:flex-col sm:items-center ">
                    <img
                        src={`${BACKEND_URL}${product.photoPath}`}
                        alt="Фотка"
                        className="min-w-56 h-72 object-center "
                    />

                    <div className="flex flex-col gap-8">
                        <h1 className="font-semibold text-primary text-base md:text-[16px] lg:text-[16px] xl:text-2xl text-wrap break-words">
                            {product.name}
                        </h1>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <p>Производитель: Paks Metal</p>
                                {product.properties.map((property) => (
                                    <div
                                        key={property.key}
                                        className="inline overflow-hidden text-ellipsis"
                                    >
                                        <span className="text-paper-contrast/70">
                                            {property.key}:{" "}
                                        </span>

                                        <span className="font-medium">
                                            {property.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-center sm:border-t-[1px] sm:border-gray-400 sm:pt-4">
                                <span className="text-primary font-bold text-xl sm:text-[14px]">
                                    {format.number(product.price).toLowerCase()}{" "}
                                    тг
                                </span>
                                <Button className="hidden items-center gap-3 bg-transparent  py-2 px-6  text-paper-contrast  sm:flex">
                                    <img
                                        src={kaspi}
                                        alt="Каспи"
                                        className="w-5 h-auto"
                                    />

                                    <span className="font-semibold text-sm text-gray-300 text-[10px]">
                                        В рассрочку
                                    </span>
                                    <span className="text-[12px] text-primary">
                                        {Math.floor(
                                            product.price / 12,
                                        ).toLocaleString("ru-RU")}{" "}
                                        x 12 мес.
                                    </span>
                                </Button>
                            </div>

                            {!inCart && (
                                <div className="flex items-center gap-4 sm:hidden">
                                    <button
                                        onClick={() => {
                                            setQuantity(
                                                Math.max(quantity - 1, 1),
                                            );
                                        }}
                                        className="bg-[#aec1ff] text-primary-contrast text-3xl leading-[0] aspect-square rounded-lg p-2"
                                    >
                                        −
                                    </button>

                                    <span className="text-lg font-medium">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={() => {
                                            setQuantity(quantity + 1);
                                        }}
                                        className="bg-[#aec1ff] text-primary-contrast text-3xl leading-[0] aspect-square rounded-lg p-2"
                                    >
                                        +
                                    </button>
                                </div>
                            )}

                            <div className="hidden sm:flex fixed bottom-0 left-0 gap-2 h-16 px-5 items-center bg-primary-contrast justify-between w-full shadow-[0_4px_16px_20px_#293E8014] rounded-lg ">
                                <Branch if={inCart}>
                                    <Link to="/cart">
                                        <Button className="py-3 flex items-center text-sm border-primary border bg-transparent text-primary max-h-10">
                                            Уже в корзине
                                        </Button>
                                    </Link>

                                    <Button
                                        onClick={() => {
                                            addProduct(product, quantity);
                                        }}
                                        className="py-3 text-sm flex border-primary border items-center gap-2 bg-primary-contrast max-h-10"
                                    >
                                        <Icon.Cart className="text-primary" />
                                        <span className="text-primary">
                                            В корзину
                                        </span>{" "}
                                    </Button>
                                </Branch>
                                <Button
                                    onClick={() => {
                                        addProduct(product, quantity);
                                        navigate("/cart");
                                    }}
                                    className="text-[12px] py-3 bg-primary text-primary-contrast max-h-10"
                                >
                                    Купить cразу
                                </Button>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:border-t-gray-300  sm:hidden ">
                                <div className="flex gap-2 items-center">
                                    <Branch if={inCart}>
                                        <Link to="/cart">
                                            <Button className="py-3 text-sm border-primary border bg-transparent text-primary">
                                                Перейти в корзину (
                                                {cartItem?.quantity})
                                            </Button>
                                        </Link>

                                        <Button
                                            onClick={() => {
                                                addProduct(product, quantity);
                                            }}
                                            className="py-3 text-sm"
                                        >
                                            Добавить в корзину{" "}
                                        </Button>
                                    </Branch>
                                    <button
                                        onClick={() => {
                                            cartItem
                                                ? navigate("/cart")
                                                : addProduct(product, quantity);
                                        }}
                                        className="py-3 text-sm"
                                    >
                                        <Icon.Cart className="w-full h-auto py-3 text-sm border-primary border bg-transparent text-primary rounded-md p-2" />
                                    </button>
                                </div>

                                <a
                                    href={product.kaspi}
                                    target="_blank"
                                    className="w-fit"
                                >
                                    <Button className="inline-flex items-center gap-4 bg-transparent border rounded-lg py-2 px-6 border-[#f14635] text-paper-contrast">
                                        <img
                                            src={kaspi}
                                            alt="Каспи"
                                            className="w-7 h-auto s"
                                        />

                                        <div className="flex flex-col justify-between items-start ">
                                            <span className="font-semibold text-sm">
                                                В рассрочку
                                            </span>
                                            <span className="text-[12px]">
                                                {Math.floor(
                                                    product.price / 12,
                                                ).toLocaleString("ru-RU")}{" "}
                                                x 12 мес.
                                            </span>
                                        </div>
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <RXTabs.Root
                    defaultValue={String(ProductTab.CHARACTERISTICS)}
                    className="flex flex-col gap-4"
                >
                    <RXTabs.List>
                        <RXTabs.Trigger
                            value={String(ProductTab.CHARACTERISTICS)}
                            className="px-4 py-2 border-b-2 border-primary text-primary text-lg font-semibold"
                        >
                            Характеристики
                        </RXTabs.Trigger>
                    </RXTabs.List>

                    <RXTabs.Content value={String(ProductTab.CHARACTERISTICS)}>
                        <p className="text-sm">{product?.description}</p>
                    </RXTabs.Content>
                </RXTabs.Root>
            </div>
        </ContentTemplate>
    );
};
