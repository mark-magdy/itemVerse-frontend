import React from "react";
import { LinkedinIcon, TwitterIcon, GithubIcon } from "lucide-react";
type TeamMember = {
  name: string;
  title: string;
  description: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
};

const TeamCard: React.FC<TeamMember> = ({ name, title, image, description, socials }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-lg font-semibold " style={{ color: "#7C3AED" }}>{name}</h3>
      <p className="text-sm text-muted-foreground" >{title}</p>
      <p className="mt-2 text-sm text-gray-500">{description}</p>

      <div className="flex justify-center space-x-4">
  {socials.linkedin && (
    <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
      <LinkedinIcon className="w-5 h-5 hover:text-[#7C3AED]" />
    </a>
  )}
  {socials.twitter && (
    <a href={socials.twitter} target="_blank" rel="noopener noreferrer">
      <TwitterIcon className="w-5 h-5 hover:text-[#7C3AED]" />
    </a>
  )}
  {socials.github && (
    <a href={socials.github} target="_blank" rel="noopener noreferrer">
      <GithubIcon className="w-5 h-5 hover:text-[#7C3AED]" />
    </a>
  )}
</div>

    </div>
  );
};

export default TeamCard;