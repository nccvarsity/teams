export enum Teams {
  PHOTOGS = 'Photogs',
  SOCIAL = 'Social',
  FOYER_EXP = 'Foyer Experience',
  COFFEE = 'Coffee',
  AMBS = 'Ambassadors',
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

// Values must match the option text in the Google Form *exactly* — a value the
// form does not recognise is silently dropped and the question comes up blank.
// Store the options verbatim (spaces, dashes and all); `encodeOption` below
// handles the URL encoding.
//
// `Teams.AMBS` is deliberately absent: the form has no Ambassadors option yet,
// so the Ambs tile links to the form with the team question left unanswered.
// Add an entry here once the option exists.
const teamToLinkMap = new Map<string, string>([
  [
    Teams.PHOTOGS,
    'Creatives (Photogs) – Servers are required to have their own cameras (DSLR or Mirrorless with interchangeable lenses)'
  ],
  [Teams.SOCIAL, 'Creatives (Social)'],
  [Teams.FOYER_EXP, 'Creatives (Foyer Experience)'],
  [Teams.COFFEE, 'Coffee Team'],
  [Teams.FOYER_OPS, 'Service Ops (Foyer Team)'],
  [Teams.AUDI_OPS, 'Service Experience (Audi team)'],
  [Teams.LOGS, 'Service Ops (Logistics)'],
  [Teams.SECURITY, 'Service Ops (Security)'],
  [Teams.VIDEO, 'Service Production (Video Team - Projections/Camera)'],
  [Teams.STAGE, 'Service Production (Stage Team)'],
  [Teams.LIGHTS, 'Service Production (Stage Team)'],
  [Teams.CAMERA, 'Service Production (Video Team - Projections/Camera)'],
  [
    Teams.GAP,
    "I'm not sure yet, but happy to help out and fill in any gaps for now!"
  ]
])

// Google Forms prefills accept `+` for spaces; everything else has to be
// percent-encoded, including the en dash in the Photogs option.
const encodeOption = (value: string) =>
  encodeURIComponent(value).replace(/%20/g, '+')

export const createLinkFromTeamClusterName = (
  teams?: string[],
  cluster?: string,
  name?: string
): string => {
  let nameUrl = '',
    clusterUrl = '',
    teamsUrl = ''

  if (name !== undefined) {
    nameUrl = `&entry.471072654=${encodeOption(name)}`
  }
  if (cluster !== undefined) {
    clusterUrl = `&entry.1722505904=${encodeOption(cluster)}`
  }
  if (teams !== undefined) {
    teams.forEach((team) => {
      const option = teamToLinkMap.get(team)
      if (option === undefined) return
      teamsUrl += `&entry.1523634892=${encodeOption(option)}`
    })
  }
  return `https://docs.google.com/forms/d/e/1FAIpQLSfw0NZxCBUtnocYviwaGqOc8gChI5uKGaAkDmDqu4f2UDwpKg/viewform?usp=pp_url${nameUrl}${clusterUrl}${teamsUrl}`
}
