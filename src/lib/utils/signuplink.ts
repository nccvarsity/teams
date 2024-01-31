export enum Teams {
  PHOTOGS = 'Photogs',
  SOCIAL = 'Social',
  FOYER_EXP = 'Foyer Experience',
  LORO = 'LORO',
  FOYER_OPS = 'Foyer Ops',
  AUDI_OPS = 'Audi Ops',
  LOGS = 'Logistics',
  SECURITY = 'Security',
  VIDEO = 'Video',
  STAGE = 'Stage',
  LIGHTS = 'Lights',
  CAMERA = 'Camera',
  GAP = 'Gap'
}

const teamToLinkMap = new Map<string, string>([
  [Teams.PHOTOGS, 'Creatives+(Photogs)'],
  [Teams.SOCIAL, 'Creatives+(Social)'],
  [Teams.FOYER_EXP, 'Creatives+(Foyer+Experience)'],
  [Teams.LORO, 'Ambassadors+(LORO+Team)'],
  [Teams.FOYER_OPS, 'Service+Ops+(Foyer+Team)'],
  [Teams.AUDI_OPS, 'Service+Ops+(Audi+Team)'],
  [Teams.LOGS, 'Service+Ops+(Logistics)'],
  [Teams.SECURITY, 'Service+Ops+(Security)'],
  [Teams.VIDEO, 'Service+Production+(Video+-+Projections/Camera)'],
  [Teams.STAGE, 'Service+Production+(Stage+-+Stage/Lights)'],
  [Teams.LIGHTS, 'Service+Production+(Stage+-+Stage/Lights)'],
  [Teams.CAMERA, 'Service+Production+(Video+-+Projections/Camera)'],
  [
    Teams.GAP,
    "I'm+not+sure+yet,+but+happy+to+help+out+and+fill+in+any+gaps+for+now!"
  ]
])

export const createLinkFromTeamClusterName = (
  teams?: string[],
  cluster?: string,
  name?: string
): string => {
  let nameUrl,
    clusterUrl,
    teamsUrl = ''

  if (name !== undefined) {
    nameUrl = `&entry.471072654=${name.replace(/\s/g, '+')}`
  }
  if (cluster !== undefined) {
    clusterUrl = `&entry.1722505904=${cluster.replace(/\s/g, '+')}`
  }
  if (teams !== undefined) {
    teams.forEach(
      (team) => (teamsUrl += `&entry.1523634892=${teamToLinkMap.get(team)}`)
    )
  }
  return `https://docs.google.com/forms/d/e/1FAIpQLSfw0NZxCBUtnocYviwaGqOc8gChI5uKGaAkDmDqu4f2UDwpKg/viewform?usp=pp_url${nameUrl}${clusterUrl}${teamsUrl}`
}
