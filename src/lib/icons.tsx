import React from "react";
import {
  Route,
  Milestone,
  Building2,
  HardHat,
  ShieldAlert,
  Tractor,
  Layers,
  Boxes,
  Flame,
  Truck,
  Hammer,
  Wrench,
  Construction,
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Calendar,
  Building,
  Briefcase,
  Sliders,
  Sparkles,
  LucideProps
} from "lucide-react";

export const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Route,
  Milestone,
  Building2,
  HardHat,
  ShieldAlert,
  Tractor,
  Layers,
  Boxes,
  Flame,
  Truck,
  Hammer,
  Wrench,
  Construction,
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Calendar,
  Building,
  Briefcase,
  Sliders,
  Sparkles
};

export function DynamicIcon({ name, className = "w-6 h-6", ...props }: { name?: string; className?: string } & LucideProps) {
  if (!name || !iconMap[name]) {
    return <Hammer className={className} {...props} />;
  }
  const IconComponent = iconMap[name];
  return <IconComponent className={className} {...props} />;
}
