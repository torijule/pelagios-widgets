function ou_sitestat(){if(document.body&&document.body.className.indexOf("ou-noauto-track")>=0)return;ou_sitestat_manual("")}function ou_sitestat_manual(n){var r,t,u,i;if(ou_tracked!=0)return;ou_tracked=1,r=document.location,t=r&&r.href?r.href:document.URL,t=t.toLowerCase(),u=ou_getcontentarea(t);if(u==0)return;ou_sitename="",ou_sitename=u=="intranet"?"intranet":u+ou_getsitename(),i=t.indexOf("/",8),i<0&&(t+="/",i=t.indexOf("/",8));if(n==""){n=ou_cleanpath(i,t),n.length>1&&(i=n.lastIndexOf("/"),i==n.length-1?n+="page":(j=n.lastIndexOf("."),j>i&&(n=n.substr(0,j)),n+=".page"));while(n.indexOf("/")>=0)n=n.replace("/",".");while(n.indexOf("..")>=0)n=n.replace("..",".");n.indexOf(".index.page")>=0&&(n=n.replace(".index.page",".page")),n.charAt(0)=="."&&(n=n.substr(1)),n.length==0&&(n="home.page"),n=ou_usertype(n),n=ou_spclparams(n,t)}t.indexOf("//openlearn.")>0&&(n="learningspace."+n),t.indexOf("//labspace.")>0&&(n="labspace."+n),t.indexOf("//search.")>0&&(n="search."+n),ou_sitestat_again(n)}function ou_sitestat_again(n){sitestat("//ouan.open.ac.uk/ou/"+ou_sitename+"/s?name="+n)}function ou_cleanpath(n,t){for(var u="",r=0,i;n<t.length;n++){i=t.charAt(n);if(i=="("){r=1;continue}if(r==1){i==")"&&(r=0);continue}if(i=="?"||i=="#")break;(i=="/"||i=="\\")&&(i="/"),i=="_"&&(i="-"),(i>="a"&&i<="z"||i>="0"&&i<="9"||i=="-"||i=="."||i=="/")&&(u+=i)}return u}function ou_getcontentarea(n){var t,r,i;if(n.indexOf(".open.ac.uk/openlearn/")>0||n.indexOf("open.edu/openlearn/")>0)return"openmedia";if(n.indexOf("open.edu")>0)return"public";if(n.indexOf(".open.ac.uk")<0)return 0;t=n.indexOf("//");if(t<0)return 0;t+=2,r=n.indexOf(".",t);if(r<0)return 0;for(i=n.substr(t,r-t),t=0;t<ou_ca_pub.length;t++)if(ou_ca_pub[t]==i)return"public";for(t=0;t<ou_ca_med.length;t++)if(ou_ca_med[t]==i)return"openmedia";for(t=0;t<ou_ca_vle.length;t++)if(ou_ca_vle[t]==i)return"vle";for(t=0;t<ou_ca_int.length;t++)if(ou_ca_int[t]==i)return"intranet";return 0}function ou_getsitename(){var i=document.cookie+";",n=i.indexOf("SAMS2session="),r,t;return n<0?typeof ouclientip!="undefined"?ou_getsitename_ip(ouclientip):ou_getsitename_ajax():(r=i.indexOf(";",n),t=i.substr(n,r-n),t.indexOf("samsStaffID")>0||t.indexOf("samsTutorID")>0?"-int":"-ext")}function ou_getsitename_ip(n){if(n=="137.108.140.184")return"-ext";if(n.indexOf("137.108.")==0)return"-int";if(n.indexOf("194.66.")==0){var t=parseInt(n.substr(7));if(t>=128&&t<=140||t==142||t==143||t==149)return"-int"}return n=="132.185.144.120"||n=="132.185.144.122"||n=="132.185.240.120"?"-int":"-ext"}function ou_getsitename_ajax(){var n=null,t;try{if(window.XMLHttpRequest)n=new XMLHttpRequest;else if(window.ActiveXObject)try{n=new ActiveXObject("Msxml2.XMLHTTP")}catch(f){n=new ActiveXObject("Microsoft.XMLHTTP")}}catch(f){}if(n==null)return"-ext";try{n.open("GET","/includes/ip.shtm",!1,null,null),n.send()}catch(f){return"-ext"}if(n.responseText==null)return"-ext";var u=n.responseText.indexOf("||*"),i=n.responseText.indexOf("*|*"),r=n.responseText.indexOf("*||");return u!=0||i<0||r<i?"-ext":(t=n.responseText.substr(i+3,r-i-3),ou_validate_ip(t)==1?ou_getsitename_ip(t):(t=n.responseText.substr(3,i-3),ou_validate_ip(t)==1?ou_getsitename_ip(t):"-ext"))}function ou_validate_ip(n){return n.length<7||n.length>15?!1:(x=n.indexOf("."),x<1||x>3?!1:(y=n.indexOf(".",x+1),y-x<2||y-x>4?!1:(x=n.indexOf(".",y+1),x-y<2||x-y>4?!1:!0)))}function ou_spclparams(n,t){for(var r,i=0;i<ou_pm_page.length;i++)if(t.indexOf(ou_pm_page[i])>0){r=t.indexOf(ou_pm_var[i]+"=");if(r>0)return i=t.substr(r+ou_pm_var[i].length+1),r=i.indexOf("&"),r>0&&(i=i.substr(0,r)),i=ou_cleanpath(0,i),r=n.lastIndexOf("."),n.substr(0,r+1)+i+n.substr(r)}return n}function ou_usertype(n){var r=document.cookie+";",u=r.indexOf("SAMS2session="),t,i;return u<=0?n:(u+=13,r=r.substr(u,r.indexOf(";",u)-u)+"&",t="",i=ou_getusertype(r,"samsStudentPI="),i!=null&&(n+="&ou_student_id="+i,t="student"),i=ou_getusertype(r,"samsStaffID="),i!=null&&(n+="&ou_staff_id="+i,t.length>0&&(t+=","),t+="staff"),i=ou_getusertype(r,"samsTutorID="),i!=null&&(n+="&ou_tutor_id="+i,t.length>0&&(t+=","),t+="tutor"),i=ou_getusertype(r,"samsSelfRegID="),i!=null&&(n+="&ou_selfreg_id="+i,t.length>0&&(t+=","),t+="self-registered"),i=ou_getusertype(r,"samsCorporateID="),i!=null&&(n+="&ou_corporate_id="+i,t.length>0&&(t+=","),t+="corporate"),i=ou_getusertype(r,"samsVisitorID="),i!=null&&(n+="&ou_special_access_id="+i,t.length>0&&(t+=","),t+="special-access"),t.length==0&&(n+="&ou_unknown_id=1",t="unknown"),n+="&ou_visitor_types="+t)}function ou_getusertype(n,t){var i=n.indexOf(t);return i<=0?null:(i+=t.length,n.substr(i,n.indexOf("&",i)-i))}function sitestat(n){var t=document,i=t.location;ns_pixelUrl=n+"&ns__t="+ +(new Date),n=ns_pixelUrl+"&ns_c="+(t.characterSet?t.characterSet:t.defaultCharset)+"&ns_ti="+escape(t.title)+"&ns_jspageurl="+escape(i&&i.href?i.href:t.URL)+"&ns_referrer="+escape(t.referrer),t.images?(new Image).src=n:t.write('<p><img src="'+n+'" height="1" width="1" alt="*"/></p>')}function ou_init(){if(ouinitdone)return;ouinitdone=!0,ou_linksline(),ou_tsinit()}function ou_init_new(){if(ouinitdone)return;ouinitdone=!0,ou_linksline_new()}function ou_linksline(){if(navigator.appName=="Netscape"&&parseFloat(navigator.appVersion)<5)return;ele=document.getElementById("ou-row2"),ele==null&&(ele=document.getElementById("ou-row3b"));if(ele==null)return;ele=ou_links_createul(ele),sb_c=document.cookie+";",sb_p=sb_c.indexOf("SAMSsession"),sb_h=0;if(sb_p>=0){for(i=sb_p+12;;i++){if(sb_c.substr(i,1)==";")break;sb_h+=sb_c.charCodeAt(i)}sb_p=sb_c.indexOf("%2E",sb_p)}sb_id="",sb_pi="";if(sb_p>=0){username="",sb_p2=sb_c.indexOf("HS7BDF=");if(sb_p2>=0){sb_p3=sb_c.indexOf(";",sb_p2),sb_p4=sb_c.indexOf("\\",sb_p2),sb_p4>0&&sb_p4<sb_p3&&(sb_p3=sb_p4);if(sb_p2>=0){for(sb_nm=sb_c.substr(sb_p2+7,sb_p3-sb_p2-7),sb_nm2="",i=0;i<sb_nm.length;i++)j=sb_nm.charCodeAt(i)%256,j>=192&&j<=223&&i<sb_nm.length-1?(k=sb_nm.charCodeAt(i+1)%256,sb_nm2+=String.fromCharCode((j-192)*64+(k-128)),i++):sb_nm2+=String.fromCharCode(j);username+=sb_nm2}}sb_p2=sb_c.indexOf("%2E",sb_p+3),sb_p2-sb_p==11?(sb_pi=sb_c.substr(sb_p+3,8),ou_links_addnodeinli(ele,document.createTextNode(username+" ("+sb_pi+")")),ou_links_addlink(ele,"ou-studenthome","https://msds.open.ac.uk/students/","StudentHome")):(sb_id="",sb_sru=0,sb_p=sb_c.indexOf("%2E",sb_p2+3),sb_p-sb_p2==11?sb_id=sb_c.substr(sb_p2+3,8):(sb_p2=sb_c.indexOf("%2E",sb_p+3),sb_p2-sb_p==11?sb_id=sb_c.substr(sb_p+3,8):(sb_p=sb_c.indexOf("%2E",sb_p2+3),sb_p-sb_p2==11?sb_id=sb_c.substr(sb_p2+3,8):(sb_z=sb_c.indexOf("SAMS2session"),sb_z>=0&&(sb_z2=sb_c.indexOf(";",sb_z),sb_z3=sb_c.indexOf("samsSelfRegID=",sb_z),sb_z3>sb_z&&sb_z3<sb_z2&&(sb_sru=1))))),username.length==0?ou_links_addnodeinli(ele,document.createTextNode(sb_id)):sb_id.length==0?ou_links_addnodeinli(ele,document.createTextNode(username)):ou_links_addnodeinli(ele,document.createTextNode(username+" ("+sb_id+")")),sb_sru==0?(ou_links_addlink(ele,"ou-studenthome","https://msds.open.ac.uk/students/","StudentHome"),ou_links_addlink(ele,"ou-tutorhome","https://msds.open.ac.uk/tutorhome/","TutorHome"),ou_links_addlink(ele,"ou-intranethome","http://intranet.open.ac.uk/","IntranetHome")):ou_links_addlink(ele,"ou-studenthome","https://msds.open.ac.uk/students/","My Account")),ou_links_addlink(ele,"ou-signout","https://msds.open.ac.uk/signon/samsoff.aspx","Sign out")}else ou_links_addlink(ele,"ou-signin","https://msds.open.ac.uk/signon/sams001.aspx?nsh=1&URL="+document.location.href,"Sign in")}function ou_linksline_new(){if(navigator.appName=="Netscape"&&parseFloat(navigator.appVersion)<5)return;sb_c=document.cookie+";",sb_p=sb_c.indexOf("SAMSsession"),sb_p>=0&&(sb_p=sb_c.indexOf("%2E",sb_p)),sb_id="",sb_pi="";if(sb_p>=0){username="",sb_p2=sb_c.indexOf("HS7BDF=");if(sb_p2>=0){for(sb_p3=sb_c.indexOf(";",sb_p2),sb_p4=sb_c.indexOf("\\",sb_p2),sb_p4>0&&sb_p4<sb_p3&&(sb_p3=sb_p4),sb_nm=sb_c.substr(sb_p2+7,sb_p3-sb_p2-7),sb_nm2="",i=0;i<sb_nm.length;i++)j=sb_nm.charCodeAt(i)%256,j>=192&&j<=223&&i<sb_nm.length-1?(k=sb_nm.charCodeAt(i+1)%256,sb_nm2+=String.fromCharCode((j-192)*64+(k-128)),i++):sb_nm2+=String.fromCharCode(j);username+=sb_nm2}sb_p2=sb_c.indexOf("%2E",sb_p+3),sb_p2-sb_p==11?(sb_pi=sb_c.substr(sb_p+3,8),ele=document.getElementById("ou-person"),ele&&(username.length==0?ele.appendChild(document.createTextNode(sb_pi)):ele.appendChild(document.createTextNode(username+" ("+sb_pi+")")),ele.style.display="inline"),ele=document.getElementById("ou-studenthome"),ele&&(ele.style.display="inline")):(sb_id="",sb_sru=0,sb_p=sb_c.indexOf("%2E",sb_p2+3),sb_p-sb_p2==11?sb_id=sb_c.substr(sb_p2+3,8):(sb_p2=sb_c.indexOf("%2E",sb_p+3),sb_p2-sb_p==11?sb_id=sb_c.substr(sb_p+3,8):(sb_p=sb_c.indexOf("%2E",sb_p2+3),sb_p-sb_p2==11?sb_id=sb_c.substr(sb_p2+3,8):(sb_z=sb_c.indexOf("SAMS2session"),sb_z>=0&&(sb_z2=sb_c.indexOf(";",sb_z),sb_z3=sb_c.indexOf("samsSelfRegID=",sb_z),sb_z3>sb_z&&sb_z3<sb_z2&&(sb_sru=1))))),ele=document.getElementById("ou-person"),ele&&(sb_id.length>0&&(username.length>0?username+=" ("+sb_id+")":username=sb_id),username.length>0&&(ele.appendChild(document.createTextNode(username)),ele.style.display="inline")),sb_sru==0?(ele=document.getElementById("ou-studenthome"),ele&&(ele.style.display="inline"),ele=document.getElementById("ou-tutorhome"),ele&&(ele.style.display="inline"),ele=document.getElementById("ou-intranet"),ele&&(ele.style.display="inline")):(ele=document.getElementById("ou-myaccount"),ele&&(ele.style.display="inline"))),ele=document.getElementById("ou-signout"),ele&&(ele.style.display="inline"),ele=document.getElementById("ou-signin1"),ele&&(ele.style.display="none")}else ele=document.getElementById("ou-signin2"),ele.href="https://msds.open.ac.uk/signon/sams001.aspx?nsh=1&URL="+document.location.href}function ou_links_createul(n){var t=document.createElement("ul");return n.appendChild(t),t}function ou_links_addlink(n,t,i,r){var u=document.createElement("a");u.setAttribute("id",t),u.setAttribute("href",i),u.setAttribute("target","_top"),u.appendChild(document.createTextNode(r)),ou_links_addnodeinli(n,u)}function ou_links_addnodeinli(n,t){var i=document.createElement("li");i.appendChild(t),n.appendChild(i)}function ou_tsinit(){s=document.cookie+";",i=s.indexOf("P14TS");if(i<0)return;j=s.indexOf(";",i);if(j<0)return;n=parseFloat(s.substr(i+6,j-i-6));if(n<2||n>4)return;ou_tschange(n)}function ou_tschange(n){e=document.getElementById("tsxcontent");if(e==null)return;document.cookie="P14TS="+n+"; expires=Sun, 01 Dec 2030 23:59:59 GMT; path=/; domain=open.ac.uk;",document.getElementById("ou-smalltext")&&(document.getElementById("ou-smalltext").style.borderColor=n==1?"#547FBD":"#ccc",document.getElementById("ou-mediumtext").style.borderColor=n==2?"#547FBD":"#ccc",document.getElementById("ou-largetext").style.borderColor=n==3?"#547FBD":"#ccc",document.getElementById("ou-extralargetext").style.borderColor=n==4?"#547FBD":"#ccc"),n=n==4?140:90+n*10,e.style.fontSize=n+"%";var r=0,t=e.getElementsByTagName("span");for(i=0;i<t.length;i++)(t[i].id.indexOf("tsx")!=-1||t[i].className.indexOf("tsx")!=-1)&&(t[i].style.fontSize=n+"%")}function ou_srchclk(){ousrchclk==0&&(document.getElementById("ousrch").value="",ousrchclk=1)}var ou_ca_pub=["www","www3","www8","css2","css3","msds","search"],ou_ca_med=["openlearn","labspace","podcast"],ou_ca_vle=["learn","learn0","learn1","learn2"],ou_ca_int=["intranet","intranet6","intranet-gw","share"],ou_pm_page=["1a/o1aprospchoice.asp"],ou_pm_var=["catcode"],ou_tracked=0,ou_sitename,ouinitdone=!1,ousrchclk=0