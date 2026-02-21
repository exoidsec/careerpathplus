import Section from "@/components/Section";
import { Heart, Users, BookOpen, Shield, Globe } from "lucide-react";

interface NGO {
  name: string;
  desc?: string;
}

const educationNGOs: NGO[] = [
  { name: "Pratham", desc: "Education + skill training for poor students (Mumbai origin)" },
  { name: "Eklavya India Foundation", desc: "Helps marginalised students access higher education" },
  { name: "Jnana Prabodhini", desc: "Youth leadership, education programs in Maharashtra" },
  { name: "Parisar Asha", desc: "Learning programs for schools & students" },
  { name: "Supervasi Foundation", desc: "Training, apprenticeships for underprivileged youth" },
];

const minorityNGOs: NGO[] = [
  { name: "Muslim Welfare Association", desc: "Education, reservation, Muslim leadership" },
  { name: "Federation of Maharashtra Muslims", desc: "Guidance & welfare platform (Nagpur)" },
  { name: "Muslim Education Society Dapoli" },
  { name: "Riyaz-ul-Uloom Welfare Trust" },
  { name: "Aabshar-E-Ilm Education Society" },
  { name: "A Y Sayyied Educational Memorial Trust" },
];

const welfareTrusts: NGO[] = [
  { name: "OSK Educational and Welfare Society" },
  { name: "Samaj Uddhar Samiti" },
  { name: "Aabid Foundation" },
  { name: "Aadarsh Bahuddeshiya Sanstha" },
  { name: "360 Life Changer Charitable Trust" },
  { name: "3rd Eye Knowledge Foundation" },
  { name: "A Ray of Hope Charitable Trust" },
  { name: "Aabhalmaya Social & Educational Trust" },
  { name: "Lokseva Kendra Nandurbar" },
];

const mentoringNGOs: NGO[] = [
  { name: "Sahaara Charitable Society", desc: "Mumbai-based support" },
  { name: "Sarthak Seva Sangh" },
  { name: "Maharashtra Dyslexia Association", desc: "Career support programs" },
  { name: "Bhoomika Student Mentoring Initiatives" },
  { name: "Dheya Career Mentoring Network Partners" },
];

const nationalNGOs: NGO[] = [
  { name: "CRY – Child Rights & You", desc: "Children's education & rights" },
  { name: "Catalysts for Social Action", desc: "Social enterprise development" },
  { name: "Teach For India", desc: "Educational equity movement" },
  { name: "Bhumi Foundation", desc: "Youth volunteering for education" },
  { name: "Angel Xpress Foundation", desc: "After-school education programs" },
  { name: "Robin Hood Army", desc: "Education volunteering" },
];

const otherNGOs: NGO[] = [
  { name: "Earth Social Foundation" },
  { name: "Help Zone Foundation" },
  { name: "Shiva Manish Welfare Foundation" },
  { name: "Book of Child's Dream Foundation" },
  { name: "A J Social Foundation" },
  { name: "Rural Development Trust Maharashtra" },
  { name: "Navodaya Foundation" },
  { name: "Mamta Foundation" },
  { name: "Swadhar Pune" },
  { name: "Miti Ki Rang" },
  { name: "Lighthouse Mentoring Project" },
  { name: "Khushiyaan Foundation" },
  { name: "Ananta Khushiyaan Trust" },
  { name: "Beach Warriors India" },
  { name: "Vatsalya Trust Navi Mumbai" },
  { name: "Divine Foundation Belapur" },
  { name: "Sujaya Foundation Navi Mumbai" },
  { name: "Bright Future Training Centres" },
  { name: "Project Mumbai" },
];

const NGOCard = ({ ngo }: { ngo: NGO }) => (
  <div className="rounded-lg border border-border bg-card p-4 shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all">
    <h3 className="font-semibold text-card-foreground text-sm">{ngo.name}</h3>
    {ngo.desc && <p className="text-xs text-muted-foreground mt-1">{ngo.desc}</p>}
  </div>
);

const icons: Record<string, React.ReactNode> = {
  education: <BookOpen className="w-5 h-5" />,
  minority: <Shield className="w-5 h-5" />,
  welfare: <Heart className="w-5 h-5" />,
  mentoring: <Users className="w-5 h-5" />,
  national: <Globe className="w-5 h-5" />,
};

const NGOSection = ({ title, icon, ngos, bg }: { title: string; icon: string; ngos: NGO[]; bg?: string }) => (
  <Section title={title} className={bg}>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {ngos.map((n) => <NGOCard key={n.name} ngo={n} />)}
    </div>
  </Section>
);

const NGOsPage = () => (
  <>
    <NGOSection title="Education & Skill Training NGOs" icon="education" ngos={educationNGOs} />
    <NGOSection title="Muslim Minority Welfare NGOs" icon="minority" ngos={minorityNGOs} bg="bg-muted/40" />
    <NGOSection title="Education & Welfare Trusts" icon="welfare" ngos={welfareTrusts} />
    <NGOSection title="Youth Mentoring NGOs (Mumbai / Pune)" icon="mentoring" ngos={mentoringNGOs} bg="bg-muted/40" />
    <NGOSection title="National NGOs Active in Maharashtra" icon="national" ngos={nationalNGOs} />
    <NGOSection title="Other Maharashtra Social/Education NGOs" icon="welfare" ngos={otherNGOs} bg="bg-muted/40" />
  </>
);

export default NGOsPage;
