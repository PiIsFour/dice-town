(this["webpackJsonpdice-town"]=this["webpackJsonpdice-town"]||[]).push([[0],{59:function(e,t,n){e.exports=n(78)},69:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){},75:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),o=n(33),s=n.n(o);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=n(15),a=n(92),u=n(54),l=(n(69),n(70),n(11)),p=n(57),d=n(96),f=(n(71),n(6)),m=n.n(f),h=n(29),v=n(26),y=Object.freeze({roll:"ROLL",moveRollToSlot:"MOVE_ROLL_TO_SLOT",returnRoll:"RETURN_ROLL",removeRollFromFailedCards:"REMOVE_ROLL_FROM_FAILED_CARDS",collectAllDiceToRoll:"COLLECT_ALL_DICE_TO_ROLL",removeCard:"REMOVE_CARD",addCard:"ADD_CARD",updatePips:"UPDATE_PIPS",removePop:"REMOVE_POP",addPop:"ADD_POP"}),w=function(e){var t=e.diceId,n=e.cardId,r=e.slot,i=e.force,o=void 0!==i&&i;return{type:y.moveRollToSlot,diceId:t,cardId:n,slot:r,force:o}},b=function(e){return new Promise((function(t){return setTimeout(t,e)}))},q=function(e){return{type:y.removeCard,cardId:e}},k=function(e){return{type:y.addCard,name:e}},R=Object.freeze({roll:"ROLL",done:"DONE",resolving:"resolving"}),O=Object.freeze({dice:"DICE"}),I=n(97),g=n(50),E=n(98),x=n(40),T=n(81),j=n(56),P=n(82),D=n(95),C=(n(73),function(e){var t=e.pos,n=e.of,r=e.type,o=["pip","pip".concat(t,"of").concat(n),"pip-".concat(r)].join(" ");return i.a.createElement("div",{className:o})}),A=function(e){var t=e.faces,n=e.up,o=e.id,s=t[n],c=s.pips,a=s.type,u=Object(r.useState)(!1),p=Object(l.a)(u,2),d=p[0],f=p[1],m=Object(D.a)({item:{type:O.dice,id:o,up:n,pips:c,pipsType:a},begin:function(){f(!1)}}),h=Object(l.a)(m,2)[1],v=function(e,t){return I.a(g.a(E.a(1,e+1)),x.a((function(n){return i.a.createElement(C,{type:t,pos:n,of:e,key:n})})))()},y=T.a(x.a);return i.a.createElement("div",{className:"dice ".concat(d?"dice-open":""),onClick:function(){return f(!d)},ref:h},v(c,a),d&&I.a(g.a(E.a(0,6)),j.a((function(e){return e!==n})),P.a(2,n),x.a((function(e){return t[e]})),y((function(e,t){return i.a.createElement("div",{className:"dice dice-ghost dice-ghost".concat(t),key:t},e&&v(e.pips,e.type))})))())},L=(n(74),n(99)),S=(n(75),function(e){var t=e.description,n=e.card,r=e.testCard,o=["requirement"];return r&&n&&o.push(r(n)?"requirement-fullfilled":"requirement-failed"),i.a.createElement("p",{className:o.join(" ")},t)}),_=function(e){var t=e.onDrop,n=e.selectedRoll,r=e.requirements,o=Object(d.a)({accept:O.dice,drop:t,canDrop:function(e){return!r||L.a((function(t){return t.testItem(e)}),r)}}),s=Object(l.a)(o,2)[1];return i.a.createElement("div",{className:"slot",ref:s},n&&i.a.createElement(A,{up:n.up,faces:n.pop.faces,id:n.pop.id}),!n&&r&&i.a.createElement("div",{className:"requirements"},r.map((function(e,t){return i.a.createElement(S,Object.assign({},e,{key:t}))}))))},N=function(e){var t=e.title,n=e.description,r=e.slots,o=e.id,s=e.requirements,a=Object(c.b)();return i.a.createElement("div",{className:"card"},i.a.createElement("h2",null,t),i.a.createElement("p",null,n),i.a.createElement("div",{className:"requirements"},s.map((function(t,n){return i.a.createElement(S,Object.assign({},t,{card:e,key:n}))}))),i.a.createElement("div",{className:"slots"},r.map((function(e,t){return i.a.createElement(_,Object.assign({},e,{onDrop:(n=t,function(e){return a(w({diceId:e.id,cardId:o,slot:n}))}),key:t}));var n}))))},M=function(){var e=Object(c.c)(p.a(["board","freePops"])),t=Object(c.c)(p.a(["board","cards"])),n=Object(c.c)(p.a(["board","nextAction"])),r=Object(c.b)(),o=Object(d.a)({accept:O.dice,drop:function(e){return r((t=e.id,{type:y.returnRoll,diceId:t}));var t}}),s=Object(l.a)(o,2)[1];return i.a.createElement("main",{className:"board"},i.a.createElement("div",{className:"cards"},t&&t.map((function(e){return i.a.createElement(N,Object.assign({},e,{key:e.id}))}))),n===R.roll&&i.a.createElement("button",{onClick:function(){return r({type:y.roll})}},"Roll"),n===R.done&&i.a.createElement("button",{onClick:function(){return r(function(){var e=Object(v.a)(m.a.mark((function e(t,n){var r,i,o,s,c,a,u;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=500,t({type:y.removeRollFromFailedCards}),e.next=4,b(r);case 4:i=n().board,o=i.cards,s=i.freePops,c=Object(h.a)(o),e.prev=6,c.s();case 8:if((a=c.n()).done){e.next=16;break}return u=a.value,e.next=12,u.resolve(t,s);case 12:return e.next=14,b(r);case 14:e.next=8;break;case 16:e.next=21;break;case 18:e.prev=18,e.t0=e.catch(6),c.e(e.t0);case 21:return e.prev=21,c.f(),e.finish(21);case 24:t({type:y.collectAllDiceToRoll});case 25:case"end":return e.stop()}}),e,null,[[6,18,21,24]])})));return function(t,n){return e.apply(this,arguments)}}())}},"Done"),n===R.resolving&&i.a.createElement("button",{disabled:!0},"resolving"),i.a.createElement("div",{className:"free-pops",ref:s},e&&e.map((function(e){var t=e.up,n=e.pop,r=n.faces,o=n.id;return i.a.createElement(A,{up:t,faces:r,id:o,key:o})}))))};var F,W=function(){return i.a.createElement("div",{className:"App"},i.a.createElement("header",{className:"App-header"},i.a.createElement("h1",null,"Dice Town")),i.a.createElement(M,null))},z=n(13),V=n(51),J=n(52),B=function(e){var t=e.createStore,n=e.applyMiddleware,r=e.thunk,i=e.composeWithDevTools;return function(e){var o=e.rootReducer,s=e.preloadedState;return t(o,s,i({})(n(r)))}}({createStore:z.createStore,applyMiddleware:z.applyMiddleware,thunk:V.a,composeWithDevTools:J.composeWithDevTools}),U=n(37),Y=n(25),G=n(55),H=function(e){return function(t){return G.a(t,e)?e:t}},$=function(e){return function(t){return I.a(e,H(t))(t)}},K=function(e,t){return $(x.a((function(n){return e(n)?t(n):n})))},Q=function(e,t){return $((function(n){return Object(Y.a)({},n,Object(U.a)({},e,t(n[e])))}))},X=n(83),Z=n(84),ee=n(31),te=Object.freeze({work:"work",life:"life"}),ne=function(){return{id:Object(ee.uuid)(),faces:[{pips:0,type:te.work},{pips:0,type:te.work},{pips:1,type:te.work},{pips:1,type:te.work},{pips:1,type:te.work},{pips:6,type:te.life}]}},re=[ne(),ne(),ne()],ie=function(e){var t=e.popId,n=e.face,r=e.pips,i=e.pipsType;return K((function(e){return e.id===t}),Q("faces",X.a(n,{pips:r,type:i})))},oe=function(e){return j.a((function(t){return t.id!==e}))},se=function(){return Z.a({id:Object(ee.uuid)(),faces:[{pips:0,type:te.work},{pips:0,type:te.work},{pips:0,type:te.work},{pips:0,type:te.work},{pips:0,type:te.work},{pips:6,type:te.life}]})},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.pops,r=void 0===n?re:n,i=t.type,o=t.popId,s=t.face,c=t.pips,a=t.pipsType;switch(i){case y.updatePips:return ie({popId:o,face:s,pips:c,pipsType:a})(r);case y.removePop:return oe(o)(r);case y.addPop:return se()(r);default:return r}},ae=n(102),ue=n(85),le=n(35),pe=n(101),de=n(90),fe=n(91),me=n(53),he=n(94),ve=n(86),ye=n(93),we=n(103),be=n(87),qe=n(88),ke=n(89),Re=n(100),Oe=function(e){return{description:"min ".concat(e," dice"),testCard:I.a(ue.a("slots"),x.a((function(e){return e.selectedRoll?1:0})),Re.a,(function(t){return t>=e}))}},Ie=he.a(ve.a),ge=function(e){return e.pop.faces[e.up]},Ee=function(e){return{description:"min ".concat(e," work"),testCard:I.a(ue.a("slots"),j.a(be.a(Ie,"selectedRoll")),x.a((function(e){return e.selectedRoll})),x.a(ge),j.a((function(e){return e.type===te.work})),x.a((function(e){return e.pips})),Re.a,(function(t){return t>=e}))}},xe=function(e){return{description:"min ".concat(e," work"),testItem:function(t){var n=t.pips;return t.pipsType===te.work&&n>=e},testRoll:function(e){var t=e.up,n=e.pop.faces[t];return this.testItem({pips:n.pips,pipsType:n.type})}}},Te=function(e){return{description:"min ".concat(e," life"),testItem:function(t){var n=t.pips;return t.pipsType===te.life&&n>=e},testRoll:function(e){var t=e.up,n=e.pop.faces[t];return this.testItem({pips:n.pips,pipsType:n.type})}}},je=function(e){var t=e.popId,n=e.face,r=e.pips,i=e.pipsType;return{type:y.updatePips,popId:t,face:n,pips:r,pipsType:i}},Pe=function(e){return L.a((function(t){return(0,t.testCard)(e)}),e.requirements)},De=function(e){return new Promise((function(t){return setTimeout(t,e)}))},Ce=he.a(ve.a),Ae=Object.freeze({"intro 1":function(){return{title:"Place a citizen",description:"The dice are your citizens and you can place them after rolling",slots:[{},{}],requirements:[Oe(2)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("intro 2")))}}},"intro 2":function(){return{title:"To many needed",description:"Sometimes you can not meet the cards requirement",slots:[{},{}],requirements:[Ee(3)],resolve:function(e){e(q(this.id)),e(k("intro 3")),e(k("death"))}}},"intro 3":function(){return{title:"Life is harsh",description:'Death is waiting, maybe we can think of a way to "keep it alive"',slots:[{},{}],requirements:[Ee(1)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("intro 4")),e(k("illness")))}}},"intro 4":function(){return{title:"Life is even worse",description:"illness will bring us closer to death, let's search some wood",slots:[{}],requirements:[Ee(0)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("fire 2")),e(k("explore 1")))}}},"fire 1":function(){return{title:"Gather wood for a fire",description:"a fire will keep the cold away",slots:[{requirements:[xe(0)]}],requirements:[Oe(1)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("fire 2")))}}},"fire 2":function(){return{title:"Rest at fire",description:"not as taxing as sitting in the cold",slots:[{requirements:[Te(2)]},{requirements:[Te(2)]}],requirements:[],resolve:function(){var e=Object(v.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!pe.a((function(e){return e.selectedRoll}),this.slots)){e.next=6;break}return I.a(g.a(this.slots),x.a(ue.a("selectedRoll")),j.a(Ce),qe.a((function(e){var n=e.up,r=e.pop,i=r.id,o=r.faces[n];t(je({popId:i,face:n,pips:ke.a(1,o.pips-1),pipsType:o.type}))})))(),e.next=4,De(1e3);case 4:t(q(this.id)),t(k("fire 1"));case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}},death:function(){return{title:"Death",description:"Life is just that way",slots:[{requirements:[(e=1,{description:"max ".concat(e," life"),testItem:function(t){var n=t.pips;return t.pipsType===te.life&&n<=e},testRoll:function(e){var t=e.up,n=e.pop.faces[t];return this.testItem({pips:n.pips,pipsType:n.type})}}),{description:"pulls",testItem:function(){return!0},testRoll:function(){return!0}}]}],requirements:[],resolve:function(){var e=Object(v.a)(m.a.mark((function e(t,n){var r,i,o,s=this;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=Object(h.a)(this.slots.entries()),e.prev=1,o=m.a.mark((function e(){var r,o,c,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Object(l.a)(i.value,2),o=r[0],c=r[1],a=c.selectedRoll){e.next=8;break}if(!(a=ae.a((function(e){return L.a((function(t){return t.testRoll(e)}),c.requirements)}),n))){e.next=8;break}return t(w({diceId:a.pop.id,cardId:s.id,slot:o,force:!0})),e.next=8,De(1e3);case 8:a&&t((u=a.pop.id,{type:y.removePop,popId:u}));case 9:case"end":return e.stop()}var u}),e)})),r.s();case 4:if((i=r.n()).done){e.next=8;break}return e.delegateYield(o(),"t0",6);case 6:e.next=4;break;case 8:e.next=13;break;case 10:e.prev=10,e.t1=e.catch(1),r.e(e.t1);case 13:return e.prev=13,r.f(),e.finish(13);case 16:case"end":return e.stop()}}),e,this,[[1,10,13,16]])})));return function(t,n){return e.apply(this,arguments)}}()};var e},illness:function(){return{title:"Illness",description:"I should really find a place to rest",slots:[{requirements:[Te(2),{description:"pulls",testItem:function(){return!0},testRoll:function(){return!0}}]}],requirements:[],resolve:function(){var e=Object(v.a)(m.a.mark((function e(t,n){var r,i,o,s=this;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=Object(h.a)(this.slots.entries()),e.prev=1,o=m.a.mark((function e(){var r,o,c,a,u;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Object(l.a)(i.value,2),o=r[0],c=r[1],a=c.selectedRoll){e.next=8;break}if(!(a=ae.a((function(e){return L.a((function(t){return t.testRoll(e)}),c.requirements)}),n))){e.next=8;break}return t(w({diceId:a.pop.id,cardId:s.id,slot:o,force:!0})),e.next=8,De(1e3);case 8:if(!a){e.next=13;break}return u=a.pop.faces[a.up],t(je({popId:a.pop.id,face:a.up,pips:ke.a(1,u.pips-2),pipsType:u.type})),e.next=13,De(1e3);case 13:case"end":return e.stop()}}),e)})),r.s();case 4:if((i=r.n()).done){e.next=8;break}return e.delegateYield(o(),"t0",6);case 6:e.next=4;break;case 8:e.next=13;break;case 10:e.prev=10,e.t1=e.catch(1),r.e(e.t1);case 13:return e.prev=13,r.f(),e.finish(13);case 16:case"end":return e.stop()}}),e,this,[[1,10,13,16]])})));return function(t,n){return e.apply(this,arguments)}}()}},"explore 1":function(){return{title:"Explore your Surroundings",description:"let's see what we can find",slots:[{requirements:[xe(0)]}],requirements:[Oe(1)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("explore 2")),e(k("hut 1")))}}},"explore 2":function(){return{title:"Explore your Surroundings",description:"let's see what we can find",slots:[{requirements:[xe(0)]}],requirements:[Oe(1)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("explore 3")),e(k("tools 1")))}}},"explore 3":function(){return{title:"Explore your Surroundings",description:"let's see what we can find",slots:[{requirements:[xe(0)]}],requirements:[Oe(1)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("end 1")))}}},"hut 1":function(){return{title:"We found a meadow",description:"if we gather some wood we could build a hut here",slots:[{requirements:[xe(1)]},{requirements:[xe(0)]}],requirements:[Oe(2)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("hut 2")))}}},"hut 2":function(){return{title:"We need more Logs",description:"we need some of the big logs",slots:[{requirements:[xe(1)]},{requirements:[xe(1)]}],requirements:[Oe(2)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("hut 3")))}}},"hut 3":function(){return{title:"Just the roof left",description:"let's search something to seal the roof",slots:[{requirements:[xe(0)]},{requirements:[xe(0)]}],requirements:[Oe(2)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("hut 4")),e(k("basic teaching")))}}},"hut 4":function(){return{title:"Maybe time to grow the Town",description:"now that we have finished th hut we could think about a child",slots:[{requirements:[Te(3)]},{requirements:[xe(1)]}],requirements:[Oe(2)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("child 2")))}}},"basic teaching":function(){return{title:"Teaching basic skills",description:"everybody starts small",slots:[{requirements:[xe(1)]},{requirements:[xe(0)]}],requirements:[Oe(2)],resolve:function(e){if(Pe(this)){var t=this.slots[1].selectedRoll;e(je({popId:t.pop.id,face:t.up,pips:1,pipsType:te.work}))}}}},"child 1":function(){return{title:"Maybe time to grow the Town",description:"we could think about a child again",slots:[{requirements:[Te(3)]},{requirements:[xe(1)]}],requirements:[Oe(2)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("child 2")))}}},"child 2":function(){return{title:"A child was born",description:"but it needs to be looked after",slots:[{requirements:[xe(0)]}],requirements:[Oe(1)],resolve:function(e){Pe(this)?(e(q(this.id)),e(k("child 3"))):(e(q(this.id)),e(k("child -1")))}}},"child 3":function(){return{title:"A child has grown",description:"and can help us now",slots:[],requirements:[],resolve:function(e){e(q(this.id)),e(k("child 1")),e({type:y.addPop})}}},"child -1":function(){return{title:"How could'd you",description:"you do know that children need to be looked after. do you?",slots:[],requirements:[],resolve:function(e){e(q(this.id)),e(k("child 1"))}}},"tools 1":function(){return{title:"Found some stones",description:"maybe we could make tools with them",slots:[{requirements:[xe(1)]}],requirements:[Oe(1)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("tools 2")))}}},"tools 2":function(){return{title:"Still trying to make those tools",description:"maybe a stick here would help",slots:[{requirements:[xe(1)]}],requirements:[Oe(1)],resolve:function(e){if(Pe(this)){e(q(this.id)),e(k("tools 3"));var t=this.slots[0].selectedRoll;e(je({popId:t.pop.id,face:t.up,pips:2,pipsType:te.work}))}}}},"tools 3":function(){return{title:"The tools work",description:"i can show you how",slots:[{requirements:[xe(1)]},{requirements:[xe(1)]}],requirements:[Oe(2)],resolve:function(e){if(Pe(this)){e(q(this.id)),e(k("tools 4"));var t=this.slots[1].selectedRoll;e(je({popId:t.pop.id,face:t.up,pips:2,pipsType:te.work}))}}}},"tools 4":function(){return{title:"Teaching toolmaking",description:"it is not that hard",slots:[{requirements:[xe(2)]},{requirements:[xe(1)]}],requirements:[Oe(2)],resolve:function(e){if(Pe(this)){var t=this.slots[1].selectedRoll;e(je({popId:t.pop.id,face:t.up,pips:2,pipsType:te.work}))}}}},"end 1":function(){return{title:"We found somthing shine",description:"we have to dig to see how big it is",slots:[{requirements:[xe(0)]},{requirements:[xe(0)]},{requirements:[xe(0)]}],requirements:[Ee(4)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("end 2")))}}},"end 2":function(){return{title:"What is this",description:"can we get it open",slots:[{requirements:[xe(0)]},{requirements:[xe(0)]},{requirements:[xe(0)]},{requirements:[xe(0)]}],requirements:[Ee(5)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("end 3")))}}},"end 3":function(){return{title:"It is alive",description:"can we talk to it",slots:[{requirements:[xe(0)]},{requirements:[xe(0)]},{requirements:[xe(0)]},{requirements:[xe(0)]}],requirements:[Ee(6)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("end 4")))}}},"end 4":function(){return{title:"It speaks",description:"can we convince it to help us",slots:[{requirements:[xe(0)]},{requirements:[xe(0)]},{requirements:[xe(0)]},{requirements:[xe(0)]},{requirements:[xe(0)]}],requirements:[Ee(7)],resolve:function(e){Pe(this)&&(e(q(this.id)),e(k("end 5")))}}},"end 5":function(){return{title:"It will take us to the stars",description:"you have won, thanks for playing",slots:[],requirements:[],resolve:function(e){Pe(this)&&e(k("end 6"))}}},"end 6":function(){return{title:"Sorry it is so short",description:"but I'm out of time, hope there are no bugs",slots:[],requirements:[],resolve:function(e){Pe(this)&&e(k("end 6"))}}}}),Le=function(e){return Object(Y.a)({id:Object(ee.uuid)(),name:e},Ae[e]())},Se={nextAction:R.roll,freePops:[],cards:[Le("intro 1")]},_e=function(e,t){return e.nextAction!==R.roll?e:Object(Y.a)({},e,{nextAction:R.done,freePops:t.map((function(e){return{pop:e,up:Math.floor(6*Math.random())}}))})},Ne=function(e){return le.a((function(t,n){var r=n.slots;return t||function(e){return I.a(x.a(ue.a("selectedRoll")),ae.a((function(t){return t&&t.pop.id===e})))}(e)(r)}),void 0)},Me=function(e){return j.a((function(t){return t.pop.id!==e}))},Fe=function(e,t){return K((function(t){return t.id===e}),t)},We=function(e){return K((function(t){return pe.a((function(t){return t.selectedRoll&&t.selectedRoll.pop.id===e}))(t.slots)}),Q("slots",K((function(t){var n=t.selectedRoll;return n&&n.pop.id===e}),Q("selectedRoll",(function(){})))))},ze=function(e){var t=e.diceId,n=e.cardId,r=e.slot,i=e.force;return function(e){var o=function(e){return ae.a((function(t){return t.pop.id===e}))}(t)(e.freePops)||Ne(t)(e.cards),s=function(e){return ae.a((function(t){return t.id===e}))}(n)(e.cards).slots[r].selectedRoll;return s===o||e.nextAction!==R.done&&!i?e:de.a({freePops:I.a(Me(t),fe.a((function(){return s}),Z.a(s))),cards:I.a(We(t),Fe(n,Q("slots",me.a(r,Q("selectedRoll",(function(){return o}))))))})(e)}},Ve=function(e){return function(t){var n=Ne(e)(t.cards);return n&&t.nextAction===R.done?de.a({freePops:Z.a(n),cards:We(e)})(t):t}},Je=he.a((function(e){return L.a((function(t){return(0,t.testCard)(e)}),e.requirements)})),Be=he.a(ve.a),Ue=x.a(fe.a(Je,Q("slots",x.a(Q("selectedRoll",(function(){})))))),Ye=function(e){return de.a({nextAction:function(){return R.resolving},freePops:(t=e.cards,ye.a(I.a(g.a(t),j.a(Je),x.a(ue.a("slots")),we.a,j.a(be.a(Be,"selectedRoll")),x.a(ue.a("selectedRoll")))())),cards:Ue})(e);var t},Ge=de.a({nextAction:function(){return R.roll},freePops:function(){return[]},cards:x.a(Q("slots",x.a(Q("selectedRoll",(function(){})))))}),He=function(e){return de.a({cards:j.a((function(t){return t.id!==e}))})},$e=function(e){return de.a({cards:Z.a(Le(e))})},Ke=function(e){var t=e.popId,n=e.face,r=e.pips,i=e.pipsType;return de.a({cards:x.a(Q("slots",K((function(e){return e.selectedRoll&&e.selectedRoll.pop.id===t}),Q("selectedRoll",Q("pop",Q("faces",X.a(n,{pips:r,type:i})))))))})},Qe=B({rootReducer:(F={pops:ce,board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.board,r=void 0===n?Se:n,i=e.pops,o=t.type,s=t.diceId,c=t.cardId,a=t.slot,u=t.name,l=t.force,p=t.popId,d=t.face,f=t.pips,m=t.pipsType;switch(o){case y.roll:return _e(r,i);case y.moveRollToSlot:return ze({diceId:s,cardId:c,slot:a,force:l})(r);case y.returnRoll:return Ve(s)(r);case y.removeRollFromFailedCards:return Ye(r);case y.collectAllDiceToRoll:return Ge(r);case y.removeCard:return He(c)(r);case y.addCard:return $e(u)(r);case y.updatePips:return Ke({popId:p,face:d,pips:f,pipsType:m})(r);default:return r}}},function(e,t){return I.a(x.a((function(n){return n(e,t)})),H(e))(F)}),preloadedState:void 0});s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(a.a,{backend:u.a},i.a.createElement(c.a,{store:Qe},i.a.createElement(W,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[59,1,2]]]);
//# sourceMappingURL=main.ceec8248.chunk.js.map