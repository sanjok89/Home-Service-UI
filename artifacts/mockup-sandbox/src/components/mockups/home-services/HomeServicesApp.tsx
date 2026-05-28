import React, { useState } from "react";
import { 
  Home, Calendar, User, Search, MapPin, Star, 
  ChevronRight, ArrowLeft, Clock, Shield, Award, 
  CreditCard, Settings, HelpCircle, LogOut, Bell,
  Battery, Wifi, Signal
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Deep teal: text-slate-800, bg-slate-900 for dark mode, but we will use specific tailwind colors.
// Teal-800 as primary brand, amber-500 as accent.

type ViewState = "home" | "bookings" | "profile" | "provider_detail" | "booking_confirmation";

interface BookingDetails {
  provider: Provider;
  day: string;
  date: string;
  time: string;
  packageName: string;
  packagePrice: number;
}

interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: number;
  avatar: string;
}

const PROVIDERS: Provider[] = [
  { id: "1", name: "Marcus Johnson", specialty: "Master Plumber", rating: 4.9, reviews: 128, price: 89, avatar: "MJ" },
  { id: "2", name: "Elena Rodriguez", specialty: "Electrician", rating: 4.8, reviews: 94, price: 95, avatar: "ER" },
  { id: "3", name: "David Chen", specialty: "HVAC Specialist", rating: 4.7, reviews: 215, price: 110, avatar: "DC" },
  { id: "4", name: "Sarah Williams", specialty: "Deep Cleaning", rating: 4.9, reviews: 342, price: 45, avatar: "SW" }
];

const CATEGORIES = [
  "Cleaning", "Plumbing", "Electrical", "HVAC", "Handyman", "Painting", "Landscaping", "Pest Control"
];

export function HomeServicesApp() {
  const [view, setViewState] = useState<ViewState>("home");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  
  const navigateTo = (newView: ViewState, provider?: Provider) => {
    if (provider) setSelectedProvider(provider);
    setViewState(newView);
  };

  const confirmBooking = (details: BookingDetails) => {
    setBookingDetails(details);
    setViewState("booking_confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8 font-sans">
      {/* Mobile Device Frame */}
      <div className="w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-slate-800 relative flex flex-col">
        
        {/* Status Bar */}
        <div className="h-12 w-full flex items-center justify-between px-6 pt-2 bg-transparent absolute top-0 z-50 text-slate-800">
          <div className="text-[14px] font-semibold">9:41</div>
          <div className="flex items-center gap-2">
            <Signal className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <Battery className="w-5 h-5" />
          </div>
        </div>
        {/* Notch Area (Visual only) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-3xl z-50"></div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50 relative pb-20 pt-12">
          {view === "home" && <HomeScreen onNavigate={navigateTo} />}
          {view === "bookings" && <BookingsScreen />}
          {view === "profile" && <ProfileScreen />}
          {view === "provider_detail" && selectedProvider && (
            <ProviderDetailScreen provider={selectedProvider} onBack={() => navigateTo("home")} onConfirm={confirmBooking} />
          )}
          {view === "booking_confirmation" && bookingDetails && (
            <BookingConfirmationScreen details={bookingDetails} onDone={() => navigateTo("bookings")} />
          )}
        </div>

        {/* Bottom Navigation */}
        {view !== "provider_detail" && view !== "booking_confirmation" && (
          <div className="h-20 bg-white border-t border-slate-100 flex items-center justify-around px-2 pb-5 absolute bottom-0 w-full z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <NavItem 
              Icon={Home} 
              label="Home" 
              active={view === "home"} 
              onClick={() => navigateTo("home")} 
            />
            <NavItem 
              Icon={Calendar} 
              label="Bookings" 
              active={view === "bookings"} 
              onClick={() => navigateTo("bookings")} 
            />
            <NavItem 
              Icon={User} 
              label="Profile" 
              active={view === "profile"} 
              onClick={() => navigateTo("profile")} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

type LucideIconComponent = React.ComponentType<{ className?: string }>;

function NavItem({ Icon, label, active, onClick }: { Icon: LucideIconComponent, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-20 gap-1 transition-colors ${
        active ? "text-teal-700" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <div className={`p-1 rounded-xl transition-all ${active ? "bg-teal-50" : ""}`}>
        <Icon className={`w-6 h-6 ${active ? "fill-teal-700/20" : ""}`} />
      </div>
      <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>{label}</span>
    </button>
  );
}

// --- SCREENS ---

function HomeScreen({ onNavigate }: { onNavigate: (view: ViewState, provider?: Provider) => void }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-teal-700 text-white px-6 pt-6 pb-20 rounded-b-[2rem]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-teal-100 text-sm font-medium mb-1">Good morning, Sarah</p>
            <div className="flex items-center text-white font-semibold gap-1">
              <MapPin className="w-4 h-4 text-amber-400" />
              San Francisco, CA
            </div>
          </div>
          <Avatar className="w-10 h-10 border-2 border-white/20">
            <AvatarFallback className="bg-amber-500 text-white">S</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input 
            className="w-full bg-white h-12 pl-12 rounded-xl text-slate-800 border-none shadow-sm placeholder:text-slate-400 focus-visible:ring-amber-500" 
            placeholder="What do you need help with?" 
          />
        </div>
      </div>

      <div className="-mt-10 px-6 space-y-8">
        {/* Categories */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Quick Book</h2>
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-6 px-6">
            {CATEGORIES.map(category => (
              <button 
                key={category} 
                className="whitespace-nowrap px-4 py-2.5 bg-white border border-slate-100 rounded-xl shadow-sm text-sm font-medium text-slate-700 hover:border-teal-200 hover:bg-teal-50 transition-colors"
                onClick={() => onNavigate("provider_detail", PROVIDERS[0])}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Book Again */}
        <div>
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-lg font-bold text-slate-800">Book Again</h2>
            <button className="text-sm font-medium text-teal-600">See all</button>
          </div>
          <div className="space-y-3">
            {[PROVIDERS[0], PROVIDERS[3]].map((pro) => (
              <Card key={pro.id} className="border-slate-100 shadow-sm rounded-2xl overflow-hidden" onClick={() => onNavigate("provider_detail", pro)}>
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">{pro.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{pro.name}</h3>
                    <p className="text-sm text-slate-500">{pro.specialty} • Last booked Oct 12</p>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-full text-amber-500 hover:text-amber-600 hover:bg-amber-50">
                    <Calendar className="w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Pros */}
        <div className="pb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">Featured Pros</h2>
          <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-6 px-6">
            {PROVIDERS.map((pro) => (
              <Card 
                key={pro.id} 
                className="min-w-[200px] border-slate-100 shadow-sm rounded-2xl shrink-0"
                onClick={() => onNavigate("provider_detail", pro)}
              >
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 mb-3">
                    <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-xl">{pro.avatar}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-slate-800 mb-1">{pro.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">{pro.specialty}</p>
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-700 mb-4 bg-slate-50 px-2 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {pro.rating}
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="font-bold text-slate-800">${pro.price}<span className="text-xs font-normal text-slate-500">/hr</span></span>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg h-8 px-3">Book</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function ProviderDetailScreen({ provider, onBack, onConfirm }: { provider: Provider, onBack: () => void, onConfirm: (details: BookingDetails) => void }) {
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: number }>({ name: "Standard Service", price: provider.price * 2 });

  const days = [
    { day: "Mon", date: "14" },
    { day: "Tue", date: "15" },
    { day: "Wed", date: "16" },
    { day: "Thu", date: "17" },
    { day: "Fri", date: "18" },
  ];

  const times = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

  const handleConfirm = () => {
    if (!selectedTime) return;
    onConfirm({
      provider,
      day: days[selectedDay].day,
      date: days[selectedDay].date,
      time: selectedTime,
      packageName: selectedPackage.name,
      packagePrice: selectedPackage.price,
    });
  };

  return (
    <div className="animate-in slide-in-from-right-8 duration-300 min-h-full bg-white flex flex-col">
      {/* Navbar */}
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-slate-100">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-slate-100">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </Button>
        <span className="font-semibold text-slate-800">Book Service</span>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Star className="w-5 h-5 text-slate-400" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Profile */}
        <div className="px-6 py-6 text-center border-b border-slate-100">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-md">
            <AvatarFallback className="bg-teal-100 text-teal-700 font-bold text-3xl">{provider.avatar}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">{provider.name}</h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-teal-50 text-teal-700 hover:bg-teal-100 font-medium">
              <Shield className="w-3 h-3 mr-1" /> Verified Pro
            </Badge>
            <span className="text-slate-500 text-sm">{provider.specialty}</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {provider.rating} <span className="text-slate-500 font-normal">({provider.reviews} reviews)</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              ${provider.price} <span className="text-slate-500 font-normal">/ hr</span>
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="px-6 py-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Service Packages</h2>
          <div className="space-y-3">
            {[
              { name: "Standard Service", desc: "Up to 2 hours of work • Parts extra", price: provider.price * 2 },
              { name: "Premium Full Day", desc: "Up to 8 hours • Priority support", price: provider.price * 7 },
            ].map((pkg) => {
              const active = selectedPackage.name === pkg.name;
              return (
                <div
                  key={pkg.name}
                  onClick={() => setSelectedPackage({ name: pkg.name, price: pkg.price })}
                  className={`rounded-2xl p-4 flex justify-between items-center cursor-pointer transition-all ${
                    active
                      ? "border-2 border-amber-400 bg-amber-50/30"
                      : "border border-slate-200 hover:border-teal-200"
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">{pkg.name}</h3>
                    <p className="text-sm text-slate-500">{pkg.desc}</p>
                  </div>
                  <div className="text-lg font-bold text-slate-800">${pkg.price}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar */}
        <div className="px-6 py-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Select Availability</h2>
          
          <div className="flex justify-between mb-6">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className={`flex flex-col items-center justify-center w-14 h-16 rounded-xl border transition-all ${
                  selectedDay === i 
                    ? "border-teal-600 bg-teal-600 text-white shadow-md" 
                    : "border-slate-200 text-slate-600 hover:border-teal-200"
                }`}
              >
                <span className="text-xs font-medium mb-1">{d.day}</span>
                <span className={`text-lg font-bold ${selectedDay === i ? "text-white" : "text-slate-800"}`}>{d.date}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {times.map((time, i) => (
              <button
                key={i}
                onClick={() => setSelectedTime(time)}
                className={`py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  selectedTime === time 
                    ? "border-amber-500 bg-amber-50 text-amber-700" 
                    : "border-slate-200 text-slate-700 hover:border-amber-200"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <Button 
          className="w-full h-14 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-lg font-bold shadow-lg shadow-teal-600/20"
          disabled={!selectedTime}
          onClick={handleConfirm}
        >
          {selectedTime ? `Schedule for ${selectedTime}` : 'Select a time'}
        </Button>
      </div>
    </div>
  );
}

function BookingConfirmationScreen({ details, onDone }: { details: BookingDetails, onDone: () => void }) {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => setConfirmed(true);

  if (confirmed) {
    return (
      <div className="animate-in fade-in duration-500 min-h-full bg-white flex flex-col items-center justify-center px-8 text-center">
        <div className="w-24 h-24 rounded-full bg-teal-50 flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-12 h-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h1>
        <p className="text-slate-500 mb-2 text-sm leading-relaxed">
          Your appointment with <span className="font-semibold text-slate-700">{details.provider.name}</span> is confirmed for
        </p>
        <p className="text-teal-700 font-bold text-lg mb-8">{details.day}, Nov {details.date} at {details.time}</p>
        <div className="w-full bg-slate-50 rounded-2xl p-4 mb-8 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Service</span>
            <span className="font-semibold text-slate-800">{details.provider.specialty}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Package</span>
            <span className="font-semibold text-slate-800">{details.packageName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Address</span>
            <span className="font-semibold text-slate-800">1234 Market St, SF</span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex justify-between text-base">
            <span className="font-bold text-slate-800">Total</span>
            <span className="font-bold text-teal-700">${details.packagePrice}</span>
          </div>
        </div>
        <Button className="w-full h-12 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold" onClick={onDone}>
          View My Bookings
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-right-8 duration-300 min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-5 border-b border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Confirm Booking</h1>
        <p className="text-slate-500 text-sm">Review your booking details before confirming</p>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Provider card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100">
          <Avatar className="w-14 h-14">
            <AvatarFallback className="bg-teal-100 text-teal-700 font-bold text-xl">{details.provider.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">{details.provider.name}</h3>
            <p className="text-sm text-slate-500">{details.provider.specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-slate-700">{details.provider.rating} · {details.provider.reviews} reviews</span>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Date &amp; Time</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <p className="font-bold text-slate-800">{details.day}, November {details.date}</p>
              <p className="text-sm text-slate-500">{details.time}</p>
            </div>
          </div>
        </div>

        {/* Service & Address */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Details</h3>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Package</span>
            <span className="font-semibold text-slate-800">{details.packageName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Address</span>
            <span className="font-semibold text-slate-800">1234 Market St, SF</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Payment</span>
            <span className="font-semibold text-slate-800">Visa •••• 4242</span>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-2">
          <div className="flex justify-between text-sm text-slate-500">
            <span>{details.packageName}</span>
            <span>${details.packagePrice}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-500">
            <span>Platform fee</span>
            <span>$5</span>
          </div>
          <div className="h-px bg-slate-100 my-1" />
          <div className="flex justify-between font-bold text-slate-800">
            <span>Total</span>
            <span className="text-teal-700">${details.packagePrice + 5}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10">
        <Button
          className="w-full h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold shadow-lg shadow-amber-500/25"
          onClick={handleConfirm}
        >
          Confirm &amp; Pay ${details.packagePrice + 5}
        </Button>
      </div>
    </div>
  );
}

function BookingsScreen() {
  return (
    <div className="animate-in fade-in duration-300 min-h-full bg-slate-50 flex flex-col px-6 pt-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">My Bookings</h1>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full grid grid-cols-2 p-1 bg-slate-200/50 rounded-xl mb-6">
          <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Active</TabsTrigger>
          <TabsTrigger value="past" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {/* Live Tracking Card with Map */}
          <Card className="border-teal-100 shadow-sm rounded-2xl overflow-hidden">
            {/* Header row */}
            <div className="px-4 pt-4 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800">Emergency Plumbing Repair</h3>
                <p className="text-xs text-slate-500 mt-0.5">Today, 2:30 PM</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none font-semibold text-xs">En Route</Badge>
                <span className="text-xs font-bold text-teal-700">ETA 15 min</span>
              </div>
            </div>

            {/* SVG Map */}
            <div className="relative w-full h-44 bg-[#e8f0e8] overflow-hidden">
              <svg viewBox="0 0 340 176" className="w-full h-full" style={{ fontFamily: "system-ui" }}>
                {/* Map background */}
                <rect width="340" height="176" fill="#e8ede8" />

                {/* Blocks / buildings */}
                <rect x="0"   y="0"   width="80"  height="60" fill="#dce8dc" />
                <rect x="100" y="0"   width="90"  height="60" fill="#dce8dc" />
                <rect x="210" y="0"   width="130" height="60" fill="#dce8dc" />
                <rect x="0"   y="80"  width="60"  height="96" fill="#dce8dc" />
                <rect x="80"  y="80"  width="110" height="96" fill="#dce8dc" />
                <rect x="210" y="80"  width="130" height="96" fill="#dce8dc" />

                {/* Roads (horizontal) */}
                <rect x="0"   y="60"  width="340" height="20" fill="#fff" />
                <rect x="0"   y="136" width="340" height="14" fill="#fff" />
                {/* Roads (vertical) */}
                <rect x="80"  y="0"   width="20"  height="176" fill="#fff" />
                <rect x="190" y="0"   width="20"  height="176" fill="#fff" />

                {/* Road center lines */}
                <line x1="0" y1="70" x2="340" y2="70" stroke="#d1d5d1" strokeWidth="1" strokeDasharray="12,8" />
                <line x1="90" y1="0" x2="90" y2="176" stroke="#d1d5d1" strokeWidth="1" strokeDasharray="12,8" />
                <line x1="200" y1="0" x2="200" y2="176" stroke="#d1d5d1" strokeWidth="1" strokeDasharray="12,8" />

                {/* Route path: from pro (left) to home (right) */}
                <polyline
                  points="60,100 90,100 90,70 200,70 200,100 240,100"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Route animated overlay */}
                <polyline
                  points="60,100 90,100 90,70 200,70 200,100 240,100"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="6,10"
                  opacity="0.6"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.2s" repeatCount="indefinite" />
                </polyline>

                {/* Home destination pin */}
                <circle cx="240" cy="100" r="14" fill="#fff" stroke="#0d9488" strokeWidth="2.5" />
                <text x="240" y="104" textAnchor="middle" fontSize="13" fill="#0d9488">⌂</text>

                {/* Pro location dot with pulse */}
                <circle cx="60" cy="100" r="18" fill="#0d9488" opacity="0.15">
                  <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="100" r="11" fill="#0d9488" stroke="#fff" strokeWidth="3" />
                <text x="60" y="104" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">MJ</text>

                {/* Street labels */}
                <text x="170" y="67" textAnchor="middle" fontSize="7" fill="#9ca3af" fontWeight="600">MARKET ST</text>
                <text x="90" y="120" textAnchor="middle" fontSize="7" fill="#9ca3af" fontWeight="600" transform="rotate(-90,90,120)">MAIN ST</text>
              </svg>

              {/* Speed / distance chip */}
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">1.2 mi away</span>
              </div>
            </div>

            {/* Provider row */}
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-teal-100 text-teal-700 font-bold">MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">Marcus Johnson</p>
                  <p className="text-xs text-slate-500">Master Plumber · ★ 4.9</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl border-teal-200 text-teal-700 text-xs h-8 px-3">
                    Call
                  </Button>
                  <Button size="sm" className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs h-8 px-3">
                    Track
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Card */}
          <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-semibold">
                  Scheduled
                </Badge>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Deep House Cleaning</h3>
              <p className="text-slate-600 text-sm mb-4">Tomorrow, 9:00 AM</p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-slate-200 text-slate-600">SW</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">Sarah Williams</p>
                  <p className="text-xs text-slate-500">Cleaning Specialist</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {[
            { service: "HVAC Maintenance", pro: "David Chen", date: "Oct 12, 2023", rating: 5, avatar: "DC" },
            { service: "Light Fixture Install", pro: "Elena Rodriguez", date: "Sep 28, 2023", rating: 4, avatar: "ER" },
            { service: "Lawn Care & Trimming", pro: "Mike Smith", date: "Sep 15, 2023", rating: 5, avatar: "MS" }
          ].map((booking, i) => (
            <Card key={i} className="border-slate-100 shadow-sm rounded-2xl overflow-hidden opacity-80">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-slate-500 border-slate-200 font-medium">
                    Completed
                  </Badge>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3.5 h-3.5 ${j < booking.rating ? 'fill-current' : 'text-slate-300'}`} />
                    ))}
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{booking.service}</h3>
                <p className="text-slate-500 text-sm mb-3">{booking.date} • {booking.pro}</p>
                <Button variant="outline" size="sm" className="w-full text-teal-600 border-teal-200 hover:bg-teal-50 rounded-xl font-semibold">
                  Book Again
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="animate-in fade-in duration-300 min-h-full bg-slate-50">
      <div className="px-6 py-8 flex flex-col items-center border-b border-slate-200 bg-white">
        <Avatar className="w-20 h-20 mb-4 border-2 border-white shadow-sm">
          <AvatarFallback className="bg-amber-500 text-white font-bold text-2xl">S</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold text-slate-800 mb-1">Sarah Jenkins</h1>
        <p className="text-slate-500 text-sm flex items-center gap-1">
          <Award className="w-4 h-4 text-teal-600" />
          Pro Member since 2021
        </p>
      </div>

      {/* Stats */}
      <div className="flex divide-x divide-slate-200 bg-white border-b border-slate-200">
        <div className="flex-1 py-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-slate-800">12</span>
          <span className="text-xs text-slate-500 font-medium">Bookings</span>
        </div>
        <div className="flex-1 py-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-slate-800">48</span>
          <span className="text-xs text-slate-500 font-medium">Hours Saved</span>
        </div>
        <div className="flex-1 py-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-slate-800">5</span>
          <span className="text-xs text-slate-500 font-medium">Pros Hired</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Addresses */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">My Addresses</h2>
          <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 flex items-center gap-3 border-b border-slate-100 bg-white">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 text-sm">Home</h3>
                <p className="text-xs text-slate-500">1234 Market St, San Francisco, CA</p>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4 flex items-center gap-3 bg-white">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 text-sm">Office</h3>
                <p className="text-xs text-slate-500">555 California St, San Francisco, CA</p>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Settings */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">Settings</h2>
          <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden bg-white divide-y divide-slate-100">
            <SettingRow icon={<CreditCard className="w-5 h-5" />} label="Payment Methods" />
            <SettingRow icon={<Bell className="w-5 h-5" />} label="Notifications" />
            <SettingRow icon={<HelpCircle className="w-5 h-5" />} label="Help & Support" />
            <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors text-red-600">
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Sign Out</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors text-slate-700">
      {icon}
      <span className="flex-1 font-medium text-sm">{label}</span>
      <ChevronRight className="w-4 h-4 text-slate-400" />
    </div>
  );
}
