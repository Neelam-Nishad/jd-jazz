import { motion } from 'motion/react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  profile: string;
}

interface TeamPageProps {
  teamMembers: TeamMember[];
  onBack: () => void;
}

export default function TeamPage({ teamMembers, onBack }: TeamPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#88583e] to-[#a08a7a] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <button
          onClick={onBack}
          className="mb-10 text-white hover:text-gray-200 transition flex items-center gap-2 text-sm font-medium"
        >
          ← Back to Home
        </button>

        <h1 className="text-3xl md:text-5xl text-center mb-16 text-white font-bold">
          Meet Our Team
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a href={member.profile} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="relative mb-4 overflow-hidden rounded-full w-56 h-56 mx-auto border-4 border-white/30 group-hover:border-white transition-all duration-300 shadow-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <h3 className="text-xl mb-2 text-white font-semibold">{member.name}</h3>
                <p className="text-gray-200">{member.role}</p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
