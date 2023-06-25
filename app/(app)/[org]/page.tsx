export default function OrgPage({ params }: { params: { org: string } }) {
  return <div>Org: {params.org}</div>;
}
