import random
from store.models import Product

for i in range(20):
    product = Product.objects.create(
        title='کنسول بازی سونی مدل PlayStation 5 Slim ظرفیت یک ترابایت ریجن اروپا 2016A به همراه بازی EA Sports FC',
        image='https://dkstatics-public.digikala.com/digikala-products/4505392f5c3321fb4784dac21b1d5d5cb6f7a1c3_1701674713.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/format,webp/quality,q_80',
        text='کنسول بازی سونی مدل PlayStation 5 Slim ظرفیت یک ترابایت ریجن اروپا 2016A به همراه بازی EA Sports FC',
        price='60000000',
        special=False,
        producer=' تست',

    )