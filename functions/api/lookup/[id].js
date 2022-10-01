export async function onRequestGet({ params }) {
    const res = await fetch(`https://rdap.nic.ch/domain/${params.id}`);
    const data = await res.json();
    const info = JSON.stringify(data, null, 2);
    return new Response(info);
  }
  