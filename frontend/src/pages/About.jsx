import { Link } from "react-router-dom";
import {
  Clock,
  MapPin,
  Star,
  ChefHat,
  Bike,
  Users,
  ArrowRight,
} from "lucide-react";
import hero_food from "../assets/hero-food.jpg";

const About = () => {
  const features = [
    {
      icon: Clock,
      title: "Lightning Fast",
      description: "Get your food delivered in under 30 minutes",
    },
    {
      icon: MapPin,
      title: "Live Tracking",
      description: "Track your order in real-time from kitchen to doorstep",
    },
    {
      icon: Star,
      title: "Top Rated",
      description: "Only the best restaurants with 4.5+ ratings",
    },
    {
      icon: ChefHat,
      title: "Fresh & Hot",
      description: "Food prepared fresh and delivered hot",
    },
  ];

  const userTypes = [
    {
      icon: Users,
      title: "Hungry Customer",
      description:
        "Order from hundreds of restaurants, track your delivery, and enjoy delicious meals at home.",
      color: "bg-gradient-hero",
      link: "/auth?role=user",
    },
    {
      icon: ChefHat,
      title: "Restaurant Owner",
      description:
        "Partner with us to reach more customers, manage orders efficiently, and grow your business.",
      color: "bg-gradient-green",
      link: "/auth?role=shop",
    },
    {
      icon: Bike,
      title: "Delivery Partner",
      description:
        "Join our fleet, set your own hours, earn great money, and be your own boss.",
      color: "bg-golden",
      link: "/auth?role=delivery",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "500+", label: "Partner Restaurants" },
    { value: "2K+", label: "Delivery Partners" },
    { value: "50K+", label: "Orders Delivered" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                🍕 #1 Food Delivery App
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
                Delicious Food,
                <br />
                <span className="text-gradient">Delivered Fast</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                From your favorite local restaurants to your doorstep in
                minutes. Fresh, hot, and absolutely delicious.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth?mode=register">
                  <button variant="hero" size="xl" className="w-full sm:w-auto">
                    Order Now
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link to="/auth?role=shop">
                  <button
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto"
                  >
                    Partner With Us
                  </button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium"
                    >
                      😊
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-golden">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      10,000+
                    </span>{" "}
                    happy customers
                  </p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-hero rounded-3xl opacity-20 blur-3xl"></div>
              <img
                src={hero_food}
                alt="Delicious food items"
                className="relative w-full rounded-3xl shadow-elevated animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient">Foodieo?</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We're not just another food delivery app. We're your gateway to
              culinary excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Join Our <span className="text-gradient">Community</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you're hungry, own a restaurant, or want to deliver –
              there's a place for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <Link key={index} to={type.link} className="group">
                <div className="h-full p-8 bg-card rounded-3xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/20">
                  <div
                    className={`w-16 h-16 rounded-2xl ${type.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <type.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {type.description}
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Getting your food delivered is easier than ever. Just three simple
              steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Food",
                desc: "Browse restaurants and pick your favorites",
              },
              {
                step: "02",
                title: "Place Your Order",
                desc: "Add to cart, checkout, and relax",
              },
              {
                step: "03",
                title: "Enjoy Your Meal",
                desc: "Track delivery and enjoy fresh food",
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="text-8xl font-display font-bold text-primary/10 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2 -mt-12">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/4 right-0 transform translate-x-1/2">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 lg:p-20 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-50"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                Ready to Order?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of satisfied customers who trust Foodieo for
                their daily meals.
              </p>
              <Link to="/auth?mode=register">
                <button variant="golden" size="xl">
                  Start Ordering Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default About;
