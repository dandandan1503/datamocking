var COMMON_VERBS = ['accept','account','achieve','act','add','admit','affect','afford','agree','aim','allow','answer','appear','apply','argue','arrange','arrive','ask','attack','avoid','base','be','beat','become','begin','believe','belong','break','build','burn','buy','call','can','care','carry','catch','cause','change','charge','check','choose','claim','clean','clear','climb','close','collect','come','commit','compare','complain','complete','concern','confirm','connect','consider','consist','contact','contain','continue','contribute','control','cook','copy','correct','cost','could','count','cover','create','cross','cry','cut','damage','dance','deal','decide','deliver','demand','deny','depend','describe','design','develop','disappear','discover','discuss','divide','do','draw','dress','drink','drive','drop','eat','enable','encourage','enjoy','examine','exist','expect','experience','explain','express','extend','face','fail','fall','fasten','feed','feel','fight','fill','find','finish','fit','fly','fold','follow','force','forget','forgive','form','found','gain','get','give','go','grow','handle','happen','have','head','hear','help','hide','hit','hold','hope','hurt','identify','imagine','improve','include','increase','indicate','influence','inform','intend','introduce','invite','involve','join','jump','keep','kick','knock','know','last','laugh','lay','lead','learn','leave','lend','let','lie','like','limit','link','listen','live','look','lose','love','make','manage','mark','matter','may','mean','measure','meet','mention','might','mind','miss','move','must','need','notice','obtain','occur','offer','open','order','ought','own','pass','pay','perform','pick','place','plan','play','point','prefer','prepare','present','press','prevent','produce','promise','protect','prove','provide','publish','pull','push','put','raise','reach','read','realize','receive','recognize','record','reduce','refer','reflect','refuse','regard','relate','release','remain','remember','remove','repeat','replace','reply','report','represent','require','rest','result','return','reveal','ring','rise','roll','run','save','say','see','seem','sell','send','separate','serve','set','settle','shake','shall','share','should','shout','show','shut','sing','sit','sleep','smile','sort','sound','speak','stand','start','state','stay','stick','stop','study','succeed','suffer','suggest','suit','supply','support','suppose','survive','take','talk','teach','tell','tend','test','thank','think','throw','touch','train','travel','treat','try','turn','understand','use','used','visit','vote','wait','walk','want','warn','wash','watch','wear','will','win','wish','wonder','work','worry','would','write'];
var COMMON_NOUNS = ['time','year','people','way','day','man','thing','life','child','world','school','state','family','student','group','country','problem','hand','part','place','case','week','company','system','issue','side','kind','head','house','service','friend','father','power','hour','game','line','end','member','law','car','city','community','name','president','team','minute','idea','kid','body','information','back','parent','face','others','level','office','door','health','person','art','war','history','party','result','change','morning','reason','research','girl','guy','food','moment','air','teacher','program','question','work','government','number','night','Mr','point','home','water','room','mother','area','money','storey','fact','month','lot','right','study','book','eye','job','word','business'];

module.exports = {
    __key: 'word'
};

module.exports['word:verb'] = Array.prototype.randomValue.bind(COMMON_VERBS);
module.exports['word:noun'] = Array.prototype.randomValue.bind(COMMON_NOUNS);
