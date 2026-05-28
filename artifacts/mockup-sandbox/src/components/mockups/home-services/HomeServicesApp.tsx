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

type ViewState = "home" | "bookings" | "profile" | "provider_detail";

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
  
  const navigateTo = (newView: ViewState, provider?: Provider) => {
    if (provider) setSelectedProvider(provider);
    setViewState(newView);
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
            <ProviderDetailScreen provider={selectedProvider} onBack={() => navigateTo("home")} />
          )}
        </div>

        {/* Bottom Navigation */}
        {view !== "provider_detail" && (
          <div className="h-20 bg-white border-t border-slate-100 flex items-center justify-around px-2 pb-5 absolute bottom-0 w-full z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <NavItem 
              icon={<Home />} 
              label="Home" 
              active={view === "home"} 
              onClick={() => navigateTo("home")} 
            />
            <NavItem 
              icon={<Calendar />} 
              label="Bookings" 
              active={view === "bookings"} 
              onClick={() => navigateTo("bookings")} 
            />
            <NavItem 
              icon={<User />} 
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

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-20 gap-1 transition-colors ${
        active ? "text-teal-700" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <div className={`p-1 rounded-xl transition-all ${active ? "bg-teal-50" : ""}`}>
        {React.cloneElement(icon as React.ReactElement, { 
          className: `w-6 h-6 ${active ? "fill-teal-700/20" : ""}` 
        })}
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

function ProviderDetailScreen({ provider, onBack }: { provider: Provider, onBack: () => void }) {
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = [
    { day: "Mon", date: "14" },
    { day: "Tue", date: "15" },
    { day: "Wed", date: "16" },
    { day: "Thu", date: "17" },
    { day: "Fri", date: "18" },
  ];

  const times = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

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
            <div className="border-2 border-amber-400 bg-amber-50/30 rounded-2xl p-4 flex justify-between items-center cursor-pointer">
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Standard Service</h3>
                <p className="text-sm text-slate-500">Up to 2 hours of work • Parts extra</p>
              </div>
              <div className="text-lg font-bold text-slate-800">${provider.price * 2}</div>
            </div>
            <div className="border border-slate-200 rounded-2xl p-4 flex justify-between items-center cursor-pointer hover:border-teal-200">
              <div>
                <h3 className="font-bold text-slate-800 mb-1">Premium Full Day</h3>
                <p className="text-sm text-slate-500">Up to 8 hours • Priority support</p>
              </div>
              <div className="text-lg font-bold text-slate-800">${provider.price * 7}</div>
            </div>
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
        >
          {selectedTime ? `Schedule for ${selectedTime}` : 'Select a time'}
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
          {/* Live Tracking Card */}
          <Card className="border-teal-100 bg-teal-50/50 shadow-sm rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none font-semibold">
                  En Route
                </Badge>
                <span className="text-sm font-semibold text-teal-800">ETA: 15 mins</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Emergency Plumbing Repair</h3>
              <p className="text-slate-600 text-sm mb-4">Today, 2:30 PM</p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-teal-100/60">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-slate-200 text-slate-600">MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">Marcus Johnson</p>
                  <p className="text-xs text-slate-500">Master Plumber</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="w-9 h-9 rounded-full border-teal-200 text-teal-700 bg-white">
                    <MapPin className="w-4 h-4" />
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
