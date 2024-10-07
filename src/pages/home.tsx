import {Link} from "wouter";

import {Button, ContentTemplate, Icon, Slider} from "@shared/ui";

import safe from "@shared/assets/safe.png";
import shelf from "@shared/assets/shelf.png";
import toolkit from "@shared/assets/toolkit.png";
import catalogue from "@shared/assets/catalogue.png";
import {useAllCategories} from "@entities/category";
import {BACKEND_URL} from "@shared/config.ts";

export const HomePage: React.FC = () => {
    const {allCategories} = useAllCategories();
    return (
        <ContentTemplate>
            <SliderSection />

            <div className="flex gap-x-6 mt-16 justify-end ">
                <div className="flex flex-col gap-y-8 lg:items-center">
                    <h3 className="text-4xl font-semibold text-primary">
                        Barys metal - это ...
                    </h3>

                    <p className="whitespace-pre-line">
                        {`Торгово-производственная компания ИП Barys работает с 2017 года. Основные направления нашей деятельности:
                        - производство строительного оборудования;
						- производство металлоизделий и оборудования медицинского назначения:
                        - изготовление декоративных и спортивных изделий из
                        металла;
						- производство мебели из металла.
						`}
                    </p>

                    <Link to="/about">
                        <Button color="secondary" className="w-fit py-2">
                            Подробнее
                        </Button>
                    </Link>
                </div>

                <img
                    src={catalogue}
                    alt="Каталог"
                    className="w-96 object-contain h-auto lg:hidden"
                />
            </div>

            <div className="flex flex-wrap mt-16 -m-4">
                {allCategories?.map((category, idx) => (
                    <Link
                        key={idx}
                        to={`catalogue?categoryId=${category.id}`}
                        className="w-1/3 p-4 lg:w-1/2 sm:w-full "
                    >
                        <div className="w-full flex flex-col items-center border border-paper-contrast/25 rounded-lg gap-y-4 p-6">
                            <div className="flex justify-center items-center gap-x-2">
                                <img
                                    key={category.id}
                                    src={`${BACKEND_URL}${category.photoPath}`}
                                    alt={category.name}
                                    className="w-full h-40 object-contain rounded-lg"
                                />
                            </div>

                            <h5 className="text-lg font-semibold text-paper-contrast">
                                {category.name}
                            </h5>
                        </div>
                    </Link>
                ))}
            </div>
        </ContentTemplate>
    );
};

const SliderSection: React.FC = () => {
    return (
        <Slider
            slidesToShow={1}
            className="max-w-full overflow-hidden rounded-2xl sm:border-0 w-full border border-paper-contrast/25   "
            autoplay
            autoplaySpeed={100000}
            speed={1000}
        >
            <div className="!flex justify-between bg-primary text-primary-contrast w-full h-[28rem]  p-12 lg:p-1  md:flex-col lg:justify-around  md:items-center ">
                <div className="flex flex-col items-start gap-y-8 lg:gap-y-10 md:gap-y-2 justify-center justify-items-start  md:w-full xl:w-[320px]  md:text-center md:items-center ">
                    <h3 className="font-semibold text-4xl md:text-[22px] xl:text-[28px] md:text-2xl">
                        Идеальные решения из металла
                    </h3>

                    <p className="text-lg  md:text-[16px]">
                        Ваш надежный партнер в мире металлических изделий
                    </p>

                    <Button
                        view="reversed"
                        className="w-fit text-lg md:hidden "
                    >
                        Заказать сейчас
                    </Button>
                </div>

                <div className="flex items-center mt-12 md:mt-1 md:justify-center sm:ml-32  lg:justify-center ">
                    <div className="relative">
                        <img
                            src={safe}
                            alt="Сейф"
                            className="relative h-auto object-contain  lg:w-52 xl:w-72 sm:w-44 "
                        />

                        <div className="absolute right-[calc(100%)] bottom-6 ">
                            <div className="relative">
                                <Icon.Path className="text-primary-contrast" />

                                <div className="absolute bottom-6 left-6 flex flex-col">
                                    <h6 className="text-secondary font-semibold">
                                        Сейф
                                    </h6>

                                    <span className="font-medium text-primary-contrast">
                                        25 000 тг
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    view="reversed"
                    className="w-fit text-lg hidden md:block "
                >
                    Заказать сейчас
                </Button>
            </div>

            <div className="!flex justify-between bg-primary-contrast text-primary w-full h-[28rem]  p-12 lg:p-1  md:flex-col lg:justify-around  md:items-center ">
                <div className="flex flex-col items-start gap-y-8 lg:gap-y-10 md:gap-y-2 justify-center justify-items-start  md:w-full xl:w-[320px]  md:text-center md:items-center ">
                    <h3 className="font-semibold text-4xl md:text-[22px] xl:text-[28px] md:text-2xl">
                        Высококачественные металлические изделия
                    </h3>

                    <p className="text-lg  md:text-[16px]">
                        Прочные и долговечные решения для дома и бизнеса
                    </p>

                    <Button
                        view="reversed"
                        className="w-fit text-lg md:hidden "
                    >
                        Заказать сейчас
                    </Button>
                </div>

                <div className="flex items-center mt-12 md:mt-1 md:justify-center  sm:ml-32 lg:justify-center ">
                    <div className="relative">
                        <img
                            src={shelf}
                            alt="Полка"
                            className="relative h-auto object-contain  lg:w-52 xl:w-72 sm:w-44 "
                        />

                        <div className="absolute right-[calc(100%)] bottom-6 ">
                            <div className="relative">
                                <Icon.Path className="text-primary" />

                                <div className="absolute bottom-6 left-6 flex flex-col">
                                    <h6 className="text-secondary font-semibold">
                                        Полка
                                    </h6>

                                    <span className="font-medium text-primary">
                                        25 000 тг
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    view="reversed"
                    className="w-fit text-lg hidden md:block "
                >
                    Заказать сейчас
                </Button>
            </div>

            <div className="!flex justify-between bg-primary-contrast text-primary w-full h-[28rem]  p-12 lg:p-0  md:flex-col lg:justify-around  md:items-center ">
                <div className="flex flex-col items-start gap-y-8 lg:gap-y-10 md:gap-y-2 justify-center justify-items-start  md:w-full xl:w-[320px]  md:text-center md:items-center ">
                    <h3 className="font-semibold text-4xl md:text-[22px] xl:text-[28px] md:text-2xl">
                        Широкий ассортимент металлических изделий
                    </h3>

                    <p className="text-lg  md:text-[16px]">
                        От мелочей до масштабных проектов – все из металла
                    </p>

                    <Button
                        view="reversed"
                        className="w-fit text-lg md:hidden "
                    >
                        Заказать сейчас
                    </Button>
                </div>

                <div className="flex items-center mt-12 md:mt-1 md:justify-center  sm:ml-32 lg:justify-center ">
                    <div className="relative">
                        <img
                            src={toolkit}
                            alt="Шкаф"
                            className="relative h-auto object-contain  lg:w-52 xl:w-72 sm:w-44 "
                        />

                        <div className="absolute right-[calc(100%)] bottom-6 ">
                            <div className="relative">
                                <Icon.Path className="text-primary" />

                                <div className="absolute bottom-6 left-6 flex flex-col">
                                    <h6 className="text-secondary font-semibold">
                                        Шкаф
                                    </h6>

                                    <span className="font-medium text-primary">
                                        25 000 тг
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    view="reversed"
                    className="w-fit text-lg hidden md:block "
                >
                    Заказать сейчас
                </Button>
            </div>
        </Slider>
    );
};
