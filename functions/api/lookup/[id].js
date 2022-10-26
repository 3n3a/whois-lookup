import {redirectList} from '../../rdap-list';
import {parse_host} from '../../extract-tld';

function getRdapServer(domainName) {
  let { tld } = parse_host(domainName);
  if (redirectList.hasOwnProperty(tld)) return [true, redirectList[tld]];
  return [false, {}];
}

export async function onRequestGet({ params, env }) {
    let result;
    try {
      const [success, rdapUrl] = getRdapServer(params.id);
      let url = "";
      if (!success) {
        // whois
        url = `${env.WHOIS_API}/whois?name=${params.id}`;
      } else {
        // rdap
        url = `${rdapUrl}domain/${params.id}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      const info = JSON.stringify(data, null, 2);
      result = new Response(info);
    } catch (e) {
      result = new Response(JSON.stringify({line: "main", message: e.message, stack: e.hasOwnProperty("stack") ? e.stack : "", }, null, 2), { status: 500 });
    }
    return result;
  }
  
