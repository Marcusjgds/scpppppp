import { useState } from "react";

const initialJobs = [
  { id:1, title:"Développeur Full Stack", description:"Nous recherchons un développeur Full Stack passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants avec les dernières technologies web.", salary:"45 000 – 60 000 €", createdAt:"2026-05-01" },
  { id:2, title:"Chargé(e) de Communication", description:"Rejoignez notre équipe pour développer notre stratégie de communication digitale et renforcer notre présence en ligne.", salary:"32 000 – 40 000 €", createdAt:"2026-05-03" },
  { id:3, title:"Responsable Logistique", description:"Pilotez et optimisez notre chaîne logistique. Vous serez responsable de la coordination entre nos entrepôts et partenaires de livraison.", salary:"48 000 – 62 000 €", createdAt:"2026-05-05" },
];

const demoApplications = [
  { id:1001, jobId:1, form:{ nom:"Martin", prenom:"Sophie", matricule:"MAT-042", age:"29", email:"sophie.martin@email.com", motivation:"Je suis passionnée par le développement web et souhaite rejoindre une équipe ambitieuse." }, status:null, receivedAt:"2026-05-08" },
  { id:1002, jobId:2, form:{ nom:"Dubois", prenom:"Lucas", matricule:"MAT-115", age:"24", email:"lucas.dubois@email.com", motivation:"Diplômé en communication digitale, je cherche à mettre mes compétences au service d'une structure dynamique." }, status:null, receivedAt:"2026-05-09" },
  { id:1003, jobId:null, form:{ nom:"Bernard", prenom:"Marie", matricule:"", age:"35", email:"marie.bernard@email.com", motivation:"Je dispose de 10 ans d'expérience en management et souhaite intégrer votre entreprise." }, status:null, receivedAt:"2026-05-10" },
];

const HR_PASSWORD = "RH2026!";

const simulateEmail = (type, data) => {
  const t = data.jobTitle || "Candidature Spontanée";
  const n = `${data.prenom} ${data.nom}`;
  return {
    confirmation: { subject:`Candidature reçue – ${t}`, body:`Bonjour ${n},\n\nNous avons bien reçu votre candidature pour le poste de ${t}.\n\nNotre équipe RH examinera votre dossier dans les meilleurs délais.\n\nCordialement,\nL'équipe SITE 11` },
    processing:   { subject:`Mise à jour – ${t}`, body:`Bonjour ${n},\n\nVotre candidature pour le poste de ${t} a été prise en charge par notre équipe RH.\n\nSi vous ne recevez pas de réponse dans les prochaines semaines, votre candidature n'aura malheureusement pas été retenue.\n\nCordialement,\nL'équipe SITE 11` },
    accepted:     { subject:`🎉 Félicitations ! – ${t}`, body:`Bonjour ${n},\n\nNous avons le plaisir de vous informer que votre candidature pour le poste de ${t} a été acceptée !\n\nNous vous contacterons très prochainement.\n\nBienvenue dans la famille SITE 11 !\n\nCordialement,\nL'équipe SITE 11` },
    refused:      { subject:`Réponse à votre candidature – ${t}`, body:`Bonjour ${n},\n\nNous vous remercions de l'intérêt que vous portez à SITE 11.\n\nAprès examen de votre candidature pour le poste de ${t}, nous avons le regret de ne pas y donner suite.\n\nCordialement,\nL'équipe SITE 11` },
  }[type];
};

function Logo() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:42,height:42,borderRadius:10,background:"linear-gradient(135deg,#C8A96E,#E8C97A)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:20,color:"#1a1a2e",fontFamily:"serif",boxShadow:"0 4px 15px rgba(200,169,110,0.4)"}}>11</div>
      <div>
        <div style={{fontWeight:700,fontSize:22,color:"#C8A96E",lineHeight:1}}>SITE 11</div>
        <div style={{fontSize:10,color:"#8899aa",letterSpacing:"0.2em",textTransform:"uppercase"}}>Recrutement</div>
      </div>
    </div>
  );
}

function Navbar({ page, setPage }) {
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:"rgba(10,12,20,0.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(200,169,110,0.15)",padding:"0 40px",height:70,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{cursor:"pointer"}} onClick={()=>setPage("home")}><Logo /></div>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        {[["home","Accueil"],["jobs","Postes"],["spontaneous","Candidature Spontanée"]].map(([p,l])=>(
          <button key={p} onClick={()=>setPage(p)} style={{background:page===p?"rgba(200,169,110,0.15)":"transparent",border:page===p?"1px solid rgba(200,169,110,0.4)":"1px solid transparent",color:page===p?"#C8A96E":"#8899aa",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:14}}>
            {l}
          </button>
        ))}
        <button onClick={()=>setPage("hr-login")} style={{background:"transparent",border:"1px solid rgba(200,169,110,0.5)",color:"#C8A96E",padding:"8px 20px",borderRadius:8,cursor:"pointer",fontSize:14,fontWeight:600}}>⚙ Espace RH</button>
      </div>
    </nav>
  );
}

function HomePage({ setPage, jobs }) {
  return (
    <div style={{minHeight:"100vh",paddingTop:70}}>
      <div style={{background:"radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.12) 0%, transparent 70%)",padding:"100px 40px 80px",textAlign:"center"}}>
        <div style={{color:"#C8A96E",fontSize:13,letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:20}}>Bienvenue sur SITE 11</div>
        <h1 style={{fontSize:"clamp(38px,6vw,68px)",color:"#f0f4ff",margin:"0 auto 20px",maxWidth:700,lineHeight:1.15}}>
          Construisez votre <span style={{color:"#C8A96E"}}>carrière</span> avec nous
        </h1>
        <p style={{color:"#8899aa",fontSize:18,maxWidth:540,margin:"0 auto 48px",lineHeight:1.7}}>
          Rejoignez notre équipe. Découvrez nos opportunités ou déposez votre candidature spontanée.
        </p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setPage("jobs")} style={{background:"linear-gradient(135deg,#C8A96E,#E8C97A)",border:"none",color:"#1a1a2e",padding:"16px 36px",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:16}}>Voir les postes disponibles</button>
          <button onClick={()=>setPage("spontaneous")} style={{background:"transparent",border:"1px solid rgba(200,169,110,0.4)",color:"#C8A96E",padding:"16px 36px",borderRadius:12,cursor:"pointer",fontWeight:600,fontSize:16}}>Candidature spontanée</button>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"40px 40px 80px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <h2 style={{color:"#f0f4ff",margin:0,fontSize:30}}>Postes disponibles <span style={{color:"#C8A96E",fontSize:20}}>({jobs.length})</span></h2>
          <button onClick={()=>setPage("jobs")} style={{background:"transparent",border:"1px solid rgba(200,169,110,0.3)",color:"#C8A96E",padding:"8px 20px",borderRadius:8,cursor:"pointer"}}>Voir tout →</button>
        </div>
        <div style={{display:"grid",gap:18,gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))"}}>
          {jobs.map(j=>(
            <div key={j.id} style={{background:"rgba(20,24,40,0.8)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:14,padding:"22px 24px"}}>
              <h3 style={{margin:"0 0 10px",color:"#f0f4ff",fontSize:17}}>{j.title}</h3>
              <div style={{color:"#C8A96E",fontWeight:600,fontSize:14}}>{j.salary}</div>
              <div style={{color:"#4a5568",fontSize:12,marginTop:4}}>Publié le {j.createdAt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobCard({ job, onApply }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{background:hover?"rgba(30,35,55,0.9)":"rgba(20,24,40,0.8)",border:`1px solid ${hover?"rgba(200,169,110,0.4)":"rgba(255,255,255,0.06)"}`,borderRadius:16,padding:"28px 30px",transition:"all 0.3s",transform:hover?"translateY(-4px)":"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:12}}>
        <h3 style={{margin:0,fontSize:21,color:"#f0f4ff"}}>{job.title}</h3>
        <div style={{textAlign:"right"}}>
          <div style={{color:"#C8A96E",fontWeight:700,fontSize:15}}>{job.salary}</div>
          <div style={{color:"#4a5568",fontSize:12,marginTop:4}}>Publié le {job.createdAt}</div>
        </div>
      </div>
      <p style={{color:"#8899aa",fontSize:14,lineHeight:1.7,margin:"0 0 22px"}}>{job.description}</p>
      <button onClick={()=>onApply(job)} style={{background:"linear-gradient(135deg,#C8A96E,#E8C97A)",border:"none",color:"#1a1a2e",padding:"10px 28px",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:14}}>Postuler →</button>
    </div>
  );
}

function JobsPage({ jobs, onApply }) {
  const [search, setSearch] = useState("");
  const filtered = jobs.filter(j=>j.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{minHeight:"100vh",maxWidth:1100,margin:"0 auto",padding:"100px 40px 80px"}}>
      <div style={{marginBottom:44}}>
        <div style={{color:"#C8A96E",fontSize:12,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:12}}>Rejoignez-nous</div>
        <h1 style={{fontSize:42,color:"#f0f4ff",margin:"0 0 20px"}}>Postes disponibles</h1>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un poste…" style={{width:"100%",maxWidth:460,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,color:"#f0f4ff",padding:"13px 18px",fontSize:15,outline:"none",boxSizing:"border-box"}}/>
      </div>
      {filtered.length===0
        ?<div style={{textAlign:"center",color:"#8899aa",padding:80}}>Aucun poste trouvé.</div>
        :<div style={{display:"grid",gap:22}}>{filtered.map(j=><JobCard key={j.id} job={j} onApply={onApply}/>)}</div>
      }
    </div>
  );
}

function SpontaneousPage({ onApply }) {
  return (
    <div style={{minHeight:"100vh",padding:"120px 40px 80px"}}>
      <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
        <div style={{width:80,height:80,background:"rgba(200,169,110,0.1)",border:"1px solid rgba(200,169,110,0.3)",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 28px"}}>📩</div>
        <h1 style={{fontSize:40,color:"#f0f4ff",margin:"0 0 16px"}}>Candidature Spontanée</h1>
        <p style={{color:"#8899aa",fontSize:17,lineHeight:1.7,marginBottom:40}}>Vous ne trouvez pas de poste correspondant à votre profil ? Envoyez-nous votre candidature.</p>
        <button onClick={()=>onApply(null)} style={{background:"linear-gradient(135deg,#C8A96E,#E8C97A)",border:"none",color:"#1a1a2e",padding:"16px 40px",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:17}}>Déposer ma candidature →</button>
      </div>
    </div>
  );
}

function ApplyModal({ job, onClose, onSuccess }) {
  const [form, setForm] = useState({nom:"",prenom:"",matricule:"",age:"",email:"",motivation:"",lettre:""});
  const [sending, setSending] = useState(false);
  const up = (k,v) => setForm(f=>({...f,[k]:v}));
  const send = async () => {
    if(!form.nom||!form.prenom||!form.email||!form.motivation){alert("Veuillez remplir les champs obligatoires.");return;}
    setSending(true); await new Promise(r=>setTimeout(r,1400)); setSending(false);
    onSuccess({form, job, email: simulateEmail("confirmation",{...form, jobTitle:job?.title||"Candidature Spontanée"})});
  };
  const inp = {width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#f0f4ff",padding:"12px 16px",fontSize:14,outline:"none",boxSizing:"border-box"};
  const lbl = {color:"#8899aa",fontSize:13,marginBottom:6,display:"block"};
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#0e1120",border:"1px solid rgba(200,169,110,0.2)",borderRadius:20,width:"100%",maxWidth:620,maxHeight:"90vh",overflow:"auto",padding:40,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:18,right:18,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#8899aa",width:34,height:34,borderRadius:8,cursor:"pointer",fontSize:16}}>✕</button>
        <div style={{marginBottom:26}}>
          <div style={{color:"#C8A96E",fontSize:12,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:6}}>Postuler</div>
          <h2 style={{margin:0,color:"#f0f4ff",fontSize:24}}>{job?.title||"Candidature Spontanée"}</h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <div style={{flex:"1 1 180px"}}><label style={lbl}>Nom *</label><input value={form.nom} onChange={e=>up("nom",e.target.value)} style={inp} placeholder="Nom"/></div>
            <div style={{flex:"1 1 180px"}}><label style={lbl}>Prénom *</label><input value={form.prenom} onChange={e=>up("prenom",e.target.value)} style={inp} placeholder="Prénom"/></div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <div style={{flex:"1 1 140px"}}><label style={lbl}>Matricule</label><input value={form.matricule} onChange={e=>up("matricule",e.target.value)} style={inp} placeholder="ex: MAT-001"/></div>
            <div style={{flex:"1 1 100px"}}><label style={lbl}>Âge</label><input type="number" value={form.age} onChange={e=>up("age",e.target.value)} style={inp} placeholder="Âge"/></div>
          </div>
          <div><label style={lbl}>Email *</label><input type="email" value={form.email} onChange={e=>up("email",e.target.value)} style={inp} placeholder="votre@email.com"/></div>
          <div><label style={lbl}>Motivation * <span style={{color:"#4a5568"}}>(texte libre)</span></label><textarea value={form.motivation} onChange={e=>up("motivation",e.target.value)} style={{...inp,minHeight:95,resize:"vertical"}} placeholder="Pourquoi postuler ?"/></div>
          <div><label style={lbl}>Lettre de motivation <span style={{color:"#4a5568"}}>(optionnel)</span></label><textarea value={form.lettre} onChange={e=>up("lettre",e.target.value)} style={{...inp,minHeight:75,resize:"vertical"}} placeholder="Votre lettre de motivation..."/></div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <div style={{flex:"1 1 200px"}}><label style={lbl}>CV <span style={{color:"#4a5568"}}>(optionnel)</span></label><input type="file" accept=".pdf,.doc,.docx" style={{...inp,padding:"9px 12px",cursor:"pointer"}}/></div>
            <div style={{flex:"1 1 200px"}}><label style={lbl}>Lettre (fichier) <span style={{color:"#4a5568"}}>(optionnel)</span></label><input type="file" accept=".pdf,.doc,.docx" style={{...inp,padding:"9px 12px",cursor:"pointer"}}/></div>
          </div>
        </div>
        <button onClick={send} disabled={sending} style={{marginTop:26,width:"100%",background:sending?"rgba(200,169,110,0.3)":"linear-gradient(135deg,#C8A96E,#E8C97A)",border:"none",color:"#1a1a2e",padding:14,borderRadius:10,cursor:sending?"not-allowed":"pointer",fontWeight:700,fontSize:16}}>{sending?"Envoi en cours…":"Envoyer ma candidature →"}</button>
      </div>
    </div>
  );
}

function SuccessModal({ data, onClose }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:"#0e1120",border:"1px solid rgba(126,200,169,0.4)",borderRadius:20,padding:44,maxWidth:520,textAlign:"center"}}>
        <div style={{fontSize:56,marginBottom:14}}>✅</div>
        <h2 style={{color:"#f0f4ff",marginBottom:10}}>Candidature envoyée !</h2>
        <p style={{color:"#8899aa",marginBottom:26,lineHeight:1.7}}>Un email de confirmation a été envoyé à <strong style={{color:"#C8A96E"}}>{data.form.email}</strong></p>
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:20,textAlign:"left",marginBottom:24}}>
          <div style={{color:"#7EC8A9",fontSize:11,letterSpacing:"0.15em",marginBottom:8}}>📧 EMAIL SIMULÉ</div>
          <div style={{color:"#C8A96E",fontSize:13,fontWeight:600,marginBottom:6}}>Objet : {data.email.subject}</div>
          <div style={{color:"#8899aa",fontSize:13,lineHeight:1.6,whiteSpace:"pre-line"}}>{data.email.body}</div>
        </div>
        <button onClick={onClose} style={{background:"linear-gradient(135deg,#C8A96E,#E8C97A)",border:"none",color:"#1a1a2e",padding:"12px 32px",borderRadius:10,cursor:"pointer",fontWeight:700}}>Fermer</button>
      </div>
    </div>
  );
}

function HRLogin({ onLogin }) {
  const [pwd, setPwd] = useState(""); const [err, setErr] = useState("");
  const tryLogin = () => { if(pwd===HR_PASSWORD){onLogin();setErr("");}else setErr("Mot de passe incorrect."); };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at 50% 50%, rgba(200,169,110,0.08) 0%, transparent 70%)"}}>
      <div style={{background:"rgba(14,17,32,0.97)",border:"1px solid rgba(200,169,110,0.2)",borderRadius:20,padding:52,width:"100%",maxWidth:420,textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:18}}>🔐</div>
        <h2 style={{color:"#f0f4ff",margin:"0 0 8px"}}>Espace RH</h2>
        <p style={{color:"#8899aa",marginBottom:28}}>Accès réservé aux équipes RH</p>
        <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryLogin()} placeholder="Mot de passe" style={{width:"100%",background:"rgba(255,255,255,0.05)",border:`1px solid ${err?"#ff6b6b":"rgba(255,255,255,0.1)"}`,borderRadius:10,color:"#f0f4ff",padding:"14px 18px",fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:10}}/>
        {err&&<div style={{color:"#ff6b6b",fontSize:13,marginBottom:8}}>{err}</div>}
        <button onClick={tryLogin} style={{width:"100%",marginTop:8,background:"linear-gradient(135deg,#C8A96E,#E8C97A)",border:"none",color:"#1a1a2e",padding:14,borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:15}}>Accéder →</button>
        <p style={{color:"#4a5568",fontSize:12,marginTop:18}}>Mot de passe : <span style={{color:"#C8A96E"}}>RH2026!</span></p>
      </div>
    </div>
  );
}

function HRDashboard({ jobs, setJobs, applications, setApplications, onLogout, goHome }) {
  const [tab, setTab] = useState("apps");
  const [editJob, setEditJob] = useState(null);
  const [newJob, setNewJob] = useState(null);
  const [emailPreview, setEmailPreview] = useState(null);
  const jf = editJob||newJob||{};
  const upJf = (k,v) => editJob?setEditJob(j=>({...j,[k]:v})):setNewJob(j=>({...j,[k]:v}));
  const saveJob = () => {
    if(editJob){setJobs(js=>js.map(j=>j.id===editJob.id?editJob:j));setEditJob(null);}
    else{setJobs(js=>[...js,{...newJob,id:Date.now(),createdAt:new Date().toISOString().split("T")[0]}]);setNewJob(null);}
  };
  const deleteJob = id => { if(window.confirm("Supprimer ce poste ?")) setJobs(js=>js.filter(j=>j.id!==id)); };
  const handleAction = (appId, action) => {
    const app = applications.find(a=>a.id===appId);
    const job = jobs.find(j=>j.id===app.jobId);
    const email = simulateEmail(action,{...app.form,jobTitle:job?.title||"Candidature Spontanée"});
    const sm = {processing:"En traitement 📋",accepted:"Accepté ✅",refused:"Refusé ❌"};
    setApplications(apps=>apps.map(a=>a.id===appId?{...a,status:sm[action]}:a));
    setEmailPreview(email);
  };
  const inp = {width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#f0f4ff",padding:"10px 14px",fontSize:13,outline:"none",boxSizing:"border-box",marginBottom:10};
  const sc = s => s?.includes("Accepté")?"#7EC8A9":s?.includes("Refusé")?"#ff8888":s?.includes("traitement")?"#C8A96E":"#8899aa";
  return (
    <div style={{minHeight:"100vh",background:"#080a14"}}>
      <div style={{background:"rgba(14,17,32,0.98)",borderBottom:"1px solid rgba(200,169,110,0.15)",padding:"22px 40px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          <Logo/>
          <div style={{width:1,height:36,background:"rgba(200,169,110,0.2)"}}/>
          <div>
            <div style={{color:"#f0f4ff",fontSize:18}}>Tableau de bord RH</div>
            <div style={{color:"#8899aa",fontSize:12}}>{jobs.length} poste(s) • {applications.length} candidature(s)</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={goHome} style={{background:"rgba(200,169,110,0.1)",border:"1px solid rgba(200,169,110,0.3)",color:"#C8A96E",padding:"8px 16px",borderRadius:8,cursor:"pointer",fontSize:13}}>← Voir le site</button>
          <button onClick={onLogout} style={{background:"rgba(255,100,100,0.1)",border:"1px solid rgba(255,100,100,0.3)",color:"#ff8888",padding:"8px 18px",borderRadius:8,cursor:"pointer"}}>Déconnexion</button>
        </div>
      </div>
      <div style={{background:"rgba(10,12,20,0.8)",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"0 40px"}}>
        <div style={{display:"flex"}}>
          {[["apps",`📩 Candidatures (${applications.length})`],["jobs","📋 Postes"]].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{background:"transparent",border:"none",borderBottom:tab===t?"2px solid #C8A96E":"2px solid transparent",color:tab===t?"#C8A96E":"#8899aa",padding:"14px 28px",cursor:"pointer",fontSize:14}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"36px 40px",maxWidth:1100,margin:"0 auto"}}>
        {tab==="apps"&&(
          <div>
            <h3 style={{color:"#f0f4ff",margin:"0 0 28px",fontSize:26}}>Candidatures reçues</h3>
            {applications.length===0
              ?<div style={{textAlign:"center",color:"#8899aa",padding:80}}>Aucune candidature reçue.</div>
              :<div style={{display:"grid",gap:18}}>
                {applications.map(app=>{
                  const job=jobs.find(j=>j.id===app.jobId);
                  const color=sc(app.status);
                  return(
                    <div key={app.id} style={{background:"rgba(20,24,40,0.9)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:26}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:10}}>
                        <div>
                          <div style={{color:"#f0f4ff",fontSize:19,marginBottom:6}}>{app.form.prenom} {app.form.nom}</div>
                          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                            <span style={{background:"rgba(200,169,110,0.15)",border:"1px solid rgba(200,169,110,0.3)",color:"#C8A96E",padding:"3px 12px",borderRadius:20,fontSize:12}}>{job?.title||"Candidature spontanée"}</span>
                            {app.form.age&&<span style={{background:"rgba(136,153,170,0.1)",border:"1px solid rgba(136,153,170,0.2)",color:"#8899aa",padding:"3px 12px",borderRadius:20,fontSize:12}}>{app.form.age} ans</span>}
                            {app.form.matricule&&<span style={{background:"rgba(136,153,170,0.1)",border:"1px solid rgba(136,153,170,0.2)",color:"#8899aa",padding:"3px 12px",borderRadius:20,fontSize:12}}>Matricule : {app.form.matricule}</span>}
                          </div>
                        </div>
                        {app.status&&<span style={{background:`${color}22`,border:`1px solid ${color}44`,color,padding:"6px 14px",borderRadius:20,fontSize:13,fontWeight:600}}>{app.status}</span>}
                      </div>
                      <div style={{color:"#5a6a7a",fontSize:13,marginBottom:10}}>📧 {app.form.email} • Reçu le {app.receivedAt}</div>
                      {app.form.motivation&&(
                        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:"12px 16px",marginBottom:16}}>
                          <div style={{color:"#C8A96E",fontSize:11,letterSpacing:"0.15em",marginBottom:6}}>MOTIVATION</div>
                          <div style={{color:"#8899aa",fontSize:13,lineHeight:1.6}}>{app.form.motivation}</div>
                        </div>
                      )}
                      {!app.status?.includes("Accepté")&&!app.status?.includes("Refusé")&&(
                        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                          {!app.status?.includes("traitement")&&(
                            <button onClick={()=>handleAction(app.id,"processing")} style={{background:"rgba(200,169,110,0.1)",border:"1px solid rgba(200,169,110,0.3)",color:"#C8A96E",padding:"9px 18px",borderRadius:8,cursor:"pointer",fontSize:13}}>📋 Prendre en charge</button>
                          )}
                          <button onClick={()=>handleAction(app.id,"accepted")} style={{background:"rgba(126,200,169,0.12)",border:"1px solid rgba(126,200,169,0.35)",color:"#7EC8A9",padding:"9px 20px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>✅ Accepter</button>
                          <button onClick={()=>handleAction(app.id,"refused")} style={{background:"rgba(255,100,100,0.1)",border:"1px solid rgba(255,100,100,0.3)",color:"#ff8888",padding:"9px 20px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>❌ Refuser</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            }
          </div>
        )}
        {tab==="jobs"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
              <h3 style={{color:"#f0f4ff",margin:0,fontSize:26}}>Gestion des postes</h3>
              <button onClick={()=>setNewJob({title:"",description:"",salary:""})} style={{background:"linear-gradient(135deg,#C8A96E,#E8C97A)",border:"none",color:"#1a1a2e",padding:"10px 22px",borderRadius:8,cursor:"pointer",fontWeight:700}}>+ Nouveau poste</button>
            </div>
            {(editJob||newJob)&&(
              <div style={{background:"rgba(20,24,40,0.9)",border:"1px solid rgba(200,169,110,0.2)",borderRadius:14,padding:28,marginBottom:28}}>
                <h4 style={{color:"#C8A96E",margin:"0 0 18px"}}>{editJob?"Modifier le poste":"Créer un nouveau poste"}</h4>
                <input value={jf.title||""} onChange={e=>upJf("title",e.target.value)} placeholder="Titre du poste *" style={inp}/>
                <textarea value={jf.description||""} onChange={e=>upJf("description",e.target.value)} placeholder="Description du poste *" style={{...inp,minHeight:90,resize:"vertical"}}/>
                <input value={jf.salary||""} onChange={e=>upJf("salary",e.target.value)} placeholder="Salaire (ex: 35 000 – 45 000 €)" style={inp}/>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={saveJob} style={{background:"linear-gradient(135deg,#C8A96E,#E8C97A)",border:"none",color:"#1a1a2e",padding:"10px 24px",borderRadius:8,cursor:"pointer",fontWeight:700}}>Sauvegarder</button>
                  <button onClick={()=>{setEditJob(null);setNewJob(null);}} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#8899aa",padding:"10px 18px",borderRadius:8,cursor:"pointer"}}>Annuler</button>
                </div>
              </div>
            )}
            <div style={{display:"grid",gap:14}}>
              {jobs.map(j=>(
                <div key={j.id} style={{background:"rgba(20,24,40,0.8)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap"}}>
                  <div>
                    <div style={{color:"#f0f4ff",fontSize:17,marginBottom:4}}>{j.title}</div>
                    <div style={{color:"#C8A96E",fontSize:13}}>{j.salary}</div>
                    <div style={{color:"#4a5568",fontSize:12,marginTop:2}}>Créé le {j.createdAt}</div>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>setEditJob(j)} style={{background:"rgba(200,169,110,0.1)",border:"1px solid rgba(200,169,110,0.3)",color:"#C8A96E",padding:"8px 18px",borderRadius:8,cursor:"pointer"}}>✏ Modifier</button>
                    <button onClick={()=>deleteJob(j.id)} style={{background:"rgba(255,100,100,0.1)",border:"1px solid rgba(255,100,100,0.3)",color:"#ff8888",padding:"8px 18px",borderRadius:8,cursor:"pointer"}}>🗑 Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {emailPreview&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#0e1120",border:"1px solid rgba(126,200,169,0.4)",borderRadius:20,padding:40,maxWidth:520,width:"100%"}}>
            <div style={{color:"#7EC8A9",fontSize:12,letterSpacing:"0.15em",marginBottom:12}}>📧 EMAIL ENVOYÉ (simulé)</div>
            <div style={{color:"#C8A96E",fontWeight:600,marginBottom:10}}>Objet : {emailPreview.subject}</div>
            <div style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:18,color:"#8899aa",fontSize:14,lineHeight:1.7,whiteSpace:"pre-line",marginBottom:24}}>{emailPreview.body}</div>
            <button onClick={()=>setEmailPreview(null)} style={{width:"100%",background:"linear-gradient(135deg,#C8A96E,#E8C97A)",border:"none",color:"#1a1a2e",padding:12,borderRadius:10,cursor:"pointer",fontWeight:700}}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [jobs, setJobs] = useState(initialJobs);
  const [applications, setApplications] = useState(demoApplications);
  const [hrMode, setHrMode] = useState(false);
  const [applyJob, setApplyJob] = useState(undefined);
  const [successData, setSuccessData] = useState(null);

  const handleSuccess = data => {
    setApplications(apps=>[...apps,{id:Date.now(),jobId:data.job?.id||null,form:data.form,status:null,receivedAt:new Date().toISOString().split("T")[0]}]);
    setApplyJob(undefined);
    setSuccessData(data);
  };

  const showNav = page!=="hr-login"&&page!=="hr-dashboard";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@400;600;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:#080a14; color:#f0f4ff; font-family:'Outfit',sans-serif; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:#0e1120; }
        ::-webkit-scrollbar-thumb { background:rgba(200,169,110,0.3); border-radius:3px; }
        input::placeholder, textarea::placeholder { color:#4a5568; }
        input:focus, textarea:focus { border-color:rgba(200,169,110,0.4) !important; }
        h1,h2,h3 { font-family:'Playfair Display',serif; }
      `}</style>
      <div style={{background:"#080a14",minHeight:"100vh"}}>
        {showNav&&<Navbar page={page} setPage={p=>{if(p==="hr-login"&&hrMode){setPage("hr-dashboard");}else setPage(p);}}/>}
        {page==="home"&&<HomePage setPage={setPage} jobs={jobs}/>}
        {page==="jobs"&&<JobsPage jobs={jobs} onApply={j=>setApplyJob(j===null?null:j)}/>}
        {page==="spontaneous"&&<SpontaneousPage onApply={j=>setApplyJob(j===null?null:j)}/>}
        {page==="hr-login"&&<HRLogin onLogin={()=>{setHrMode(true);setPage("hr-dashboard");}}/>}
        {page==="hr-dashboard"&&<HRDashboard jobs={jobs} setJobs={setJobs} applications={applications} setApplications={setApplications} goHome={()=>setPage("home")} onLogout={()=>{setHrMode(false);setPage("home");}}/>}
        {applyJob!==undefined&&<ApplyModal job={applyJob} onClose={()=>setApplyJob(undefined)} onSuccess={handleSuccess}/>}
        {successData&&<SuccessModal data={successData} onClose={()=>setSuccessData(null)}/>}
      </div>
    </>
  );
}
