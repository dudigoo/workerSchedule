
function doGet(e) {
  let email = Session.getActiveUser().getEmail();
  Logger.log('did get =' + email);
  let ho= HtmlService.createTemplateFromFile('Index');
  //let h= HtmlService.createHtmlOutputFromFile('Index');
  ho.mode=e.parameters.mode;
  ho.hist=e.parameters.hist;
  ho.group=e.parameters.group;
  ho.lvl=e.parameters.lvl;
  ho.all_hours=e.parameters.all;
  let title='מערכת שעות';
  if (ho.hist=='y'){
    title='היסטוריית מערכת שעות';
  }
  //Logger.log('ho.hist=' + ho.hist+' title='+title);
  return ho.evaluate().setTitle(title);
}

function getUserSched(mode, hist, group, lvl, all_hours) {
  aprj.collectParams();
  //Logger.log('in getUserSched');
  out={};
  if (mode=='one'){
    out.email = Session.getActiveUser().getEmail();
    Logger.log('out.email='+JSON.stringify(out.email));
    //out.email='Oshersoffer@gmail.com';
    let wrkr=aprj.getWorkerByMail(out.email);
    Logger.log('wrkr='+wrkr);
    if (wrkr){
      out.name= aprj.getWorkerByMail(out.email).name;
      Logger.log('mail='+out.email+' nm='+out.name);
    } else {
      out.name='Unknown';
      Logger.log('mail='+out.email+' Invalid');
      return (out);
    }
  } else {
      out.name=undefined;
  }
  out.rows=aprj.getSchedWrkrRows(out.name,hist, group, lvl, all_hours);
  //Logger.log('out.rows[0].length='+out.rows[0].length);
  return (out);
}
