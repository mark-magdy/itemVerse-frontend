// components/TeamSection.tsx
import TeamCard from "./TeamCart";

const teamMembers = [
  {
    name: "Mark Magdy",
    title: "Founder & CEO",
    description: "Early staff at Spotify and Clearbit.",
    image: "/images/Mark.jpg",
    socials: {
      github: "https://github.com/mark-magdy",
      linkedin: "https://www.linkedin.com/in/mark-magdy-716b03206/",
    },
  },
  {
    name: "Kirolos Morcos",
    title: "Engineering Manager",
    description: "Led teams at Figma and Pitch.",
    image: "/images/Kiro.jpg",
    socials: {
      github: "https://github.com/kirolosmorcos",
      linkedin: "https://www.linkedin.com/in/kirolos-morcos-202b14231/",
    },
  },
  {
    name: "Jessica Fady",
    title: "Founder & CEO",
    description: "Early staff at Spotify and Clearbit.",
    image: "/images/Jessy.jpg",
    socials: {
      github: "https://github.com/jessyfady",
      linkedin: "https://www.linkedin.com/in/jessica-fady-5b5544325/",
    },
  },
  {
    name: "Ramez Emad",
    title: "Founder & CEO",
    description: "Early staff at Spotify and Clearbit.",
    image: "/images/Ramez.jpg",
    socials: {
      github: "https://github.com/Rozza2",
      linkedin: "#",
    },
  },
  {
    name: "John Shoukry",
    title: "Founder & CEO",
    description: "Early staff at Spotify and Clearbit.",
    image: "/images/Jhons.jpg",
    socials: {
      github: "https://github.com/john-shoukry",
      linkedin: "#",
    },
  },
  {
    name: "Youssef Ehab",
    title: "Founder & CEO",
    description: "Early staff at Spotify and Clearbit.",
    image: "/images/Youssef.jpg",
    socials: {
      github: "https://github.com/Youssef-Ehab30",
      linkedin: "#",
    },
  },
  {
    name: "Youstina Magdy",
    title: "Founder & CEO",
    description: "Early staff at Spotify and Clearbit.",
    image: "/images/Zak.jpg",
    socials: {
      github: "https://github.com/YoustinaZak",
      linkedin: "#",
    },
  },
  {
    name: "John Emil",
    title: "Founder & CEO",
    description: "Early staff at Spotify and Clearbit.",
    image: "/images/Jhone.jpg",
    socials: {
      github: "https://github.com/JohnE03",
      linkedin: "#",
    },
  },
  {
    name: "Mina Sameh",
    title: "Founder & CEO",
    description: "Early staff at Spotify and Clearbit.",
    image: "/images/Mina.jpg",
    socials: {
      github: "https://github.com/DevByMina",
      linkedin: "#",
    },
  },

 
];


const TeamSection = () => {
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Leadership team</h2>
        <p className="text-muted-foreground mt-2">We're building the future of software development.</p>
      </div>

    <div className="space-y-8">
  {/* First row: grid of 5 */}
  <div className="grid grid-cols-5 gap-6 justify-items-center">
    {teamMembers.slice(0, 5).map((member, index) => (
      <TeamCard key={index} {...member} />
    ))}
  </div>

  {/* Second row: 4 cards centered using flex */}
  <div className="flex justify-center gap-6 flex-wrap">
    {teamMembers.slice(5).map((member, index) => (
      <TeamCard key={index + 5} {...member} />
    ))}
  </div>
</div>


    </section>
  );
};

export default TeamSection;

