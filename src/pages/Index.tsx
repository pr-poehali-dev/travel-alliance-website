import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [tourists, setTourists] = useState('1');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();

  const tours = [
    {
      id: 1,
      title: 'Байкальская одиссея',
      description: 'Незабываемое путешествие по берегам священного озера с посещением бухты Песчаная и острова Ольхон',
      duration: '7 дней',
      price: '45 000 ₽',
      image: 'https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/fcba7f24-04b7-4b6c-b57b-a2d28228fcf9.jpg',
      difficulty: 'Средняя'
    },
    {
      id: 2,
      title: 'Горные вершины Забайкалья',
      description: 'Треккинг по горным хребтам с восхождением на живописные вершины и ночёвками в палатках',
      duration: '5 дней',
      price: '35 000 ₽',
      image: 'https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/b508a694-1ac4-44af-835f-3de5aaa5886f.jpg',
      difficulty: 'Высокая'
    },
    {
      id: 3,
      title: 'Заповедные тропы',
      description: 'Экологический тур по заповедникам края с наблюдением за дикой природой и редкими животными',
      duration: '4 дня',
      price: '28 000 ₽',
      image: 'https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/fcba7f24-04b7-4b6c-b57b-a2d28228fcf9.jpg',
      difficulty: 'Низкая'
    }
  ];

  const routes = [
    {
      name: 'Маршрут "Кругобайкальская железная дорога"',
      points: ['Иркутск', 'Слюдянка', 'Байкал', 'Листвянка'],
      season: 'Май - Сентябрь'
    },
    {
      name: 'Маршрут "Сердце Забайкалья"',
      points: ['Чита', 'Алханай', 'Агинское', 'Даурский заповедник'],
      season: 'Июнь - Август'
    },
    {
      name: 'Маршрут "Легенды Ольхона"',
      points: ['Иркутск', 'Хужир', 'Мыс Бурхан', 'Мыс Хобой'],
      season: 'Май - Октябрь'
    }
  ];

  const reviews = [
    {
      name: 'Анна Соколова',
      text: 'Потрясающий тур! Профессиональные гиды, продуманная программа. Байкал оставил незабываемые впечатления.',
      rating: 5,
      tour: 'Байкальская одиссея'
    },
    {
      name: 'Дмитрий Волков',
      text: 'Отличная организация похода. Всё было на высшем уровне - от питания до маршрута. Обязательно вернёмся!',
      rating: 5,
      tour: 'Горные вершины Забайкалья'
    },
    {
      name: 'Елена Кузнецова',
      text: 'Замечательный экологический тур! Увидели редких животных, насладились природой. Спасибо команде Travel Alliance!',
      rating: 5,
      tour: 'Заповедные тропы'
    }
  ];

  const handleBooking = () => {
    if (!startDate || !selectedTour) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Бронирование отправлено!',
      description: `Мы свяжемся с вами для подтверждения тура "${selectedTour.title}"`,
    });
    setIsBookingOpen(false);
    setStartDate(undefined);
    setTourists('1');
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/12ffb808-b5c0-4bde-9554-4c238e8dff52.jpg" 
                alt="Travel Alliance" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="text-2xl font-heading font-bold text-primary">Travel Alliance</span>
            </div>
            <div className="hidden md:flex gap-6">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors font-medium">
                Главная
              </button>
              <button onClick={() => scrollToSection('tours')} className="text-foreground hover:text-primary transition-colors font-medium">
                Туры
              </button>
              <button onClick={() => scrollToSection('routes')} className="text-foreground hover:text-primary transition-colors font-medium">
                Маршруты
              </button>
              <button onClick={() => scrollToSection('gallery')} className="text-foreground hover:text-primary transition-colors font-medium">
                Фотогалерея
              </button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors font-medium">
                О компании
              </button>
              <button onClick={() => scrollToSection('reviews')} className="text-foreground hover:text-primary transition-colors font-medium">
                Отзывы
              </button>
            </div>
            <Button variant="default" size="sm" className="hidden md:flex">
              <Icon name="Phone" size={16} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/fcba7f24-04b7-4b6c-b57b-a2d28228fcf9.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="container mx-auto px-4 relative z-10 animate-fade-in">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              Откройте для себя Забайкалье
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Авантюрные туры по самым живописным уголкам края. 
              Профессиональные гиды, безопасность, незабываемые впечатления.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" onClick={() => scrollToSection('tours')}>
                <Icon name="Compass" size={20} className="mr-2" />
                Выбрать тур
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                <Icon name="Play" size={20} className="mr-2" />
                Смотреть видео
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Наши туры
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Тщательно разработанные маршруты для любого уровня подготовки
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="font-heading text-xl">{tour.title}</CardTitle>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tour.difficulty === 'Низкая' ? 'bg-green-100 text-green-700' :
                      tour.difficulty === 'Средняя' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tour.difficulty}
                    </span>
                  </div>
                  <CardDescription>{tour.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="text-xl font-bold text-primary">{tour.price}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog open={isBookingOpen && selectedTour?.id === tour.id} onOpenChange={(open) => {
                    setIsBookingOpen(open);
                    if (open) setSelectedTour(tour);
                  }}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-secondary hover:bg-secondary/90" onClick={() => setSelectedTour(tour)}>
                        <Icon name="Calendar" size={16} className="mr-2" />
                        Забронировать
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-heading">Бронирование тура</DialogTitle>
                        <DialogDescription>
                          {selectedTour?.title} - {selectedTour?.price}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ваше имя</Label>
                          <Input id="name" placeholder="Иван Иванов" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input id="phone" placeholder="+7 (999) 123-45-67" />
                        </div>
                        <div className="space-y-2">
                          <Label>Дата начала тура</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left">
                                <Icon name="Calendar" size={16} className="mr-2" />
                                {startDate ? format(startDate, 'PPP', { locale: ru }) : 'Выберите дату'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                locale={ru}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tourists">Количество туристов</Label>
                          <Select value={tourists} onValueChange={setTourists}>
                            <SelectTrigger id="tourists">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'человек' : num < 5 ? 'человека' : 'человек'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={handleBooking} className="w-full">
                        Отправить заявку
                      </Button>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="routes" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Популярные маршруты
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Проверенные тропы по самым красивым местам Забайкальского края
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="font-heading flex items-start gap-2">
                    <Icon name="MapPin" size={20} className="text-secondary flex-shrink-0 mt-1" />
                    <span>{route.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Ключевые точки:</p>
                    <div className="flex flex-wrap gap-2">
                      {route.points.map((point, i) => (
                        <span key={i} className="text-sm bg-accent/20 text-accent-foreground px-3 py-1 rounded-full">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Sun" size={16} />
                    <span>Сезон: {route.season}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Фотогалерея
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Природа Забайкалья в лучших кадрах наших путешествий
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: 'https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/a308cfbf-8492-4e3c-bbf9-9ece27d03dd8.jpg', caption: 'Горное озеро Забайкалья', tall: false },
              { src: 'https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/9f2e0f0f-0005-4728-8ef9-3acce0d41548.jpg', caption: 'Таёжные просторы', tall: true },
              { src: 'https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/bc5fdec0-01d5-4715-bf6b-1c99d6013f19.jpg', caption: 'Закат в горах', tall: false },
              { src: 'https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/56e56851-1e24-4995-86d8-6e1a37dfdbc0.jpg', caption: 'Каменные каньоны', tall: false },
              { src: 'https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/86aaeaf8-7027-49c8-98d7-6c35b5e8e8c1.jpg', caption: 'Альпийские луга', tall: true },
              { src: 'https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/0fb6554a-4fd8-47cf-8de2-98edf17f1055.jpg', caption: 'Зимний Байкал', tall: false }
            ].map((photo, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  photo.tall ? 'md:row-span-2' : ''
                }`}
              >
                <div className={`${photo.tall ? 'h-[400px] md:h-full' : 'h-[300px]'} overflow-hidden`}>
                  <img 
                    src={photo.src} 
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-heading text-xl font-semibold">{photo.caption}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Icon name="Camera" size={20} className="mr-2" />
              Смотреть больше фото
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                О компании Travel Alliance
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Мы — команда профессионалов, влюблённых в природу Забайкалья. 
                  Уже более 10 лет мы организуем туры для тех, кто ищет настоящие приключения.
                </p>
                <p>
                  Наша миссия — показать красоту родного края, сохранив при этом его первозданность. 
                  Мы работаем только с сертифицированными гидами и следим за безопасностью каждого участника.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">10+</div>
                    <div className="text-sm text-muted-foreground">лет опыта</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">500+</div>
                    <div className="text-sm text-muted-foreground">туристов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">25+</div>
                    <div className="text-sm text-muted-foreground">маршрутов</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden animate-scale-in">
              <img 
                src="https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/b508a694-1ac4-44af-835f-3de5aaa5886f.jpg"
                alt="Команда Travel Alliance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Отзывы путешественников
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Что говорят о нас наши клиенты
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={24} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{review.tour}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://cdn.poehali.dev/projects/9f9e0a4b-d821-45e6-81ac-842aad9a004e/files/12ffb808-b5c0-4bde-9554-4c238e8dff52.jpg" 
                  alt="Travel Alliance" 
                  className="h-10 w-10 rounded-full"
                />
                <span className="text-xl font-heading font-bold">Travel Alliance</span>
              </div>
              <p className="text-sm opacity-90">
                Туры по Забайкалью с 2014 года
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm opacity-90">
                <p>+7 (902) 123-45-67</p>
                <p>info@travel-alliance.ru</p>
                <p>г. Чита, ул. Ленина, 1</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <div className="space-y-2 text-sm opacity-90">
                <p className="cursor-pointer hover:opacity-100" onClick={() => scrollToSection('tours')}>Туры</p>
                <p className="cursor-pointer hover:opacity-100" onClick={() => scrollToSection('routes')}>Маршруты</p>
                <p className="cursor-pointer hover:opacity-100" onClick={() => scrollToSection('gallery')}>Фотогалерея</p>
                <p className="cursor-pointer hover:opacity-100" onClick={() => scrollToSection('about')}>О нас</p>
                <p className="cursor-pointer hover:opacity-100" onClick={() => scrollToSection('reviews')}>Отзывы</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Мы в соцсетях</h3>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                  <Icon name="Mail" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10">
                  <Icon name="MessageCircle" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
            <p>© 2024 Travel Alliance. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}