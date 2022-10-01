import {redirectList} from '../../rdap-list';
import {parse_host} from '../../extract-tld';

function getRdapServer(domainName) {
  const tld = parse_host(domainName).tld;
  return redirectList[tld];
}

export async function onRequestGet({ params }) {
    try {
      const rdapUrl = getRdapServer(params.id);
      const res = await fetch(`https://${rdapUrl}/domain/${params.id}`);
      const data = await res.json();
      const info = JSON.stringify(data, null, 2);
      return new Response(info);
    } catch (e) {
      return new Response(JSON.stringify(e, null, 2), { status: 500 });
    }
  }
  
