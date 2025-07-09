import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamComposition {
  role: string;
  count: number;
  color: string;
}

interface TeamOverviewProps {
  teamData: TeamComposition[];
  totalMembers: number;
}

export function TeamOverview({ teamData, totalMembers }: TeamOverviewProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lime-200 flex items-center gap-3">
          <div className="w-6 h-6 bg-lime-500/20 rounded-full flex items-center justify-center">
            <span className="text-lime-400 text-sm font-bold">{totalMembers}</span>
          </div>
          Composição da Equipe
        </CardTitle>
        <CardDescription>
          {totalMembers} profissionais especializados trabalhando em harmonia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-6">
          {teamData.map((member, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl font-bold ${member.color} mb-2`}>
                {member.count}
              </div>
              <p className="text-zinc-400">{member.role}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
