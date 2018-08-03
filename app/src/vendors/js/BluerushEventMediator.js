/**
 * @author Emz
 * @version 1.2
 * @date 2014-08-14
 * @company Bluerush
 */
(function(window,undefined){

    var VERSION = 1.2,
        length = 0,
        allowInstanciation = false,
        events = {},
        eventsDispatcher,
        eventsDispatcherPriorityDict,
        eventsDispatcherPriorityArray;

    function BluerushEventMediator(){
        if(window.$){
            this.init();
        }
    }

    var pBluerushEventMediator = BluerushEventMediator.prototype;

    BluerushEventMediator.prototype = {
        init:function(){
            if(eventsDispatcher){
                return;
            }
            eventsDispatcher = $({});
            eventsDispatcher.events = {};
            eventsDispatcherPriorityDict = {};
        },
        getVersion:function(){ 
            return VERSION;
        },
        getInit:function(){ 
            this.init();
            return (eventsDispatcher !== undefined);
        },
        /* Unregister an event to the event mediator */
        unbind:function(eventName){
            if(!this.getInit()){
                return this;
            }
            if(eventsDispatcher.events[eventName] !== undefined){
                eventsDispatcher.unbind(eventName);
                delete eventsDispatcher.events[eventName];
            }
            for(var x in eventsDispatcherPriorityArray){
                var evtDispatcher = eventsDispatcherPriorityArray[x].eventDispatcher;
                if(evtDispatcher.events[eventName] === true){
                    evtDispatcher.unbind(eventName);
                    delete evtDispatcher.events[eventName];
                }
            }
            return this;
        },
        has:function(eventName){
            if(!this.getInit()){
               return; 
            }
            if(eventsDispatcher.events[eventName] !== undefined){
                return true;
            }
            else if(eventsDispatcherPriorityArray && eventsDispatcherPriorityArray.length){
                for(var x in eventsDispatcherPriorityArray){
                    if(eventsDispatcherPriorityArray[x].eventDispatcher.events[eventName] === true) return true;
                }
                return false;
            }else{
                return false;
            }
        },
        /* Register an event to the event mediator */
        bind:function( p_eventName, p_callback, p_priority, p_onlyCallOnce ){
            if(p_eventName === undefined || !this.getInit()){
              return this;  
            }

            function singleBind(p_eventName, p_callback, p_priority, p_onlyCallOnce){

                if(p_priority !== undefined && p_priority !== 0){
                    var evtDispatcher = eventsDispatcherPriorityDict[p_priority];
                    if(evtDispatcher === undefined){
                        eventsDispatcherPriorityDict[p_priority] = $({});
                        evtDispatcher = eventsDispatcherPriorityDict[p_priority]; 
                        evtDispatcher.events = {};
                    }
                    evtDispatcher.events[p_eventName] = true;
                    /* Recreate the ordered array */
                    eventsDispatcherPriorityArray = [];
                    for(var x in eventsDispatcherPriorityDict){
                        eventsDispatcherPriorityArray.push({index:x,eventName:p_eventName,eventDispatcher:eventsDispatcherPriorityDict[x]});
                    }
                    eventsDispatcherPriorityArray = eventsDispatcherPriorityArray.sort(function(a,b){return a.index + b.index;});
                    evtDispatcher.bind(p_eventName,p_callback);
                }else{
                    eventsDispatcher.bind(p_eventName,p_callback);
                    eventsDispatcher.events[p_eventName] = true;
                }
            }

            var eventNames = p_eventName.split(",");
            for(var x in eventNames){
                eventNames[x] = eventNames[x].replace(/^\s+/, '').replace(/\s+$/, '');
                singleBind(eventNames[x],p_callback, p_priority, p_onlyCallOnce );
            }
            return this;
        },
        /* Send an event to the event mediator */
        trigger:function( p_eventName, p_options ){
            if(p_eventName === undefined || !this.getInit()){
               return this; 
            }
            
            /* Call the prioritized events first */
            for(var x in eventsDispatcherPriorityArray){

                //eventsDispatcherPriorityArray[x].eventDispatcher.triggerHandler(p_eventName,p_options);
                triggerScrub(eventsDispatcherPriorityArray[x].eventDispatcher,p_eventName,p_options);
            }

            /* Call the events */
           // eventsDispatcher.triggerHandler(p_eventName,p_options);
            triggerScrub(eventsDispatcher,p_eventName,p_options);
            return this;
        }
    };

    function triggerScrub(eventsDispatcher,eventName,options){
        var evtSplit = eventName.split("."),
            len = evtSplit.length;
        eventsDispatcher.triggerHandler(eventName,options);
        if(len > 1){
            evtSplit.pop();
            triggerScrub(eventsDispatcher,evtSplit.join("."),options);
        }         
    }

    window.BEM = window.BluerushEventMediator = new BluerushEventMediator();

})(window);