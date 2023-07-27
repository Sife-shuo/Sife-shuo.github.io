document.domain = "4399.com";
var isLoadingAntiindulgence = 1;
$(function(){
	var Anti_ptid = 15;
	var regLevel = 4;
	var loginLevel = 4;
	var defaultbizId = 1199006632;
	var Anti_token = '';
	var Anti_verify_status = '';
	var Anti_bthandle = 0;
	var Anti_idcard_status = '';
	var countdowntime = new Array();
	var countdowninfo = new Array();
	var offlineinfo = new Array();
	var Anti_lastRequestTime = 0;
	var Anti_refresh = 0;
	var Anti_refreshtimes = 0;
	var Anti_minReauestTime = 10000;//�������ʱ����
	var Anti_before_start = 0;
	var Anti_clearId = '';
	var Anti_before_start_text = "";
	var Anti_countDowning = 0;
	var Anti_not_login = 0;//����ʱ���յ���Ϊ1 ����һ��״̬ ���ٵ���ʾ��
	var Anti_veryUrl = "//h.api.4399.com/unifiedLogin/user/realname/status";
	var Anti_golbalRunning = 0;//�������=1�Ż����з�����
	
	var Anti_openClientBaseLine = 1;//�ͻ��˶��׷��� 1���� 2�ر�
	var Anti_clientBaselineWord = '���������쳣��Ϊ�˸��õ���Ϸ���飬��������״̬�����½�����Ϸ';
	var Anti_connectNever = 1;//��δ��ͨ��������������0
	var Anti_connectRetryTimes = 0;//��������
	var Anti_connectRetryMaxTimes = 6;//��ೢ���������� ����errr��timeout���ᴥ�� ��߳���2

	var Anti_self_role = 0;//1�ǳ��� ������0
	var Anti_get_self_role = 0;//�Ƿ��ȡ���û����� ��ȡ����1 ��ȡ����2
	
	//�Ƿ�������Ϸҳ�汻������������Ƕ
	var Anti_in_otherdomain = 0;
	try{
		typeof(parent.nFlashId);
	}catch(e){
		Anti_in_otherdomain = 1;
	}

	
	//�ж��Ƿ���iframe��
	window.isIniframe = function(){
		var isiniframesymbol = 1;
		if(window.self==window.top){
			isiniframesymbol = 0;
		}
		return isiniframesymbol;
	} 
	
	//���topҳ���Ƿ��Ѿ������� 
	function checkTopAntiindulgence(){
		if(isIniframe()==1){
			if(Anti_in_otherdomain==0){
				if("undefined" == typeof parent.isLoadingAntiindulgence){//���iframe���ر����������ܳ���˫�ط�����
					if(typeof(parent.nFlashId) == "undefined"){
						
					}else{
						Anti_golbalRunning = 0;
					}
				}else{
					Anti_golbalRunning = 0;
				}
			}else{//����Ƕ������������
				Anti_golbalRunning = 1;
			}
		}
	}

	//��ȡua���ж��Ƿ�ĳ����
	function checkUaHasPlatform(msg){
		var ua = window.navigator.userAgent.toLowerCase();
		return ua.search(msg)!=-1
	}
	
	//��ȡbizid
	window.getBizid = function(){
		var mybizid = defaultbizId;
		if(isIniframe()==0){//����
			if("undefined" == typeof window.gameBizid){
				window.gameBizid = "0";
			}
			if(window.gameBizid.length>5){
				mybizid = gameBizid;
				showSilence("top:bizid���ڱ���"+mybizid);
			}else{
				mybizid = defaultbizId;
				showSilence("top:bizidʹ��Ĭ��"+mybizid);
			}
		}else{//iframe
			if(Anti_in_otherdomain==0){
				if("undefined" == typeof parent.gameBizid){
					parent.gameBizid = "0";
				}
				if(parent.gameBizid.length>5){
					mybizid = parent.gameBizid;
					showSilence("iframe:bizid�Ӷ����ȡ"+mybizid);
				}else{
					mybizid = defaultbizId;
					showSilence("iframe:bizidʹ��Ĭ��"+mybizid);
				}
			}else{
				mybizid = defaultbizId;
			}
		}
		return mybizid;
	}
	
	var bizId = getBizid();
	
	//��Ϸid
	if(typeof(nFlashId) == "undefined"){
		Anti_gid = 400;
	}else{
		Anti_gid = parseInt(nFlashId);
	}

	//��ȡuid
	var Anti_uid = Anti_getUidFunc();
	if(!Anti_uid){Anti_uid=0;}

	//����UI
	append();

	//��ʼ����¼
	if("undefined" == typeof UniLogin){
		showClientDeniedForUniLoginFalse();
	}else{
		UniLogin.setUnionLoginProps({
			regLevel : regLevel,
			loginLevel : loginLevel,
			bizId:bizId,
			appId : "dev4399",
			canBack : "true",
			layout : "vertical",
			layoutSelfAdapting : "false",
			displayMode : "popup",
			regMode : "reg_auto",
			iframeStylePosition : "fixed",
			flashDisplayMode : "hide",
			qrLogin : "true",
			loginCallback : loginCallback,
			logoutCallback : logoutCallback,
			regCallback : loginCallback,
			postPopupShowFunction : closeLogRegWindow,
			getPopupUcenterTop : function(){return 160;}
		})
	}

	//�������
	heartBeat();

	//�ж��ǲ����ڱ��ҳ�汻�������˻�
	if(Anti_openClientBaseLine==1){
		var Anti_oldUid = 0;
		setInterval(function(){
			//���Ի�ȡuid
			try{
				var Anti_newUid = UniLogin.getUid();
				if(!Anti_newUid){Anti_newUid = 0;}

				//��δ��¼��ɵ�¼ ���������ɵ�¼�����һ����¼�˺Ż����ɵ�¼�˺ű���˳��˺� ˢҳ��
				if(Anti_oldUid==0 && Anti_newUid==0){
					//δ��¼
				}else if(Anti_oldUid==0 && Anti_newUid>0){
					//��¼
					Anti_oldUid = Anti_newUid;
					//showSilence("�Զ���������");
					//Anti_get_sele_role();
				}else if(Anti_oldUid>0 && Anti_newUid==0){
					//�˳�
					window.location.reload();
					try{parent.location.reload();}catch(e){}
				}else{//������>0
					if(Anti_oldUid == Anti_newUid){
						//��¼�˺�δ�仯
					}else{
						window.location.reload();
						try{parent.location.reload();}catch(e){}
					}
				}
			}catch(e){
				showClientDeniedForUniLoginFalse();
			}
		},3000);
	}

	//��ȡ�û�����
	function Anti_get_sele_role(){
		showSilence("Anti_get_self_role:"+Anti_get_self_role);
		if(Anti_get_self_role==0){
			Anti_get_self_role = 1;
			if("undefined" != typeof UniLogin){
				try{
					showSilence("�������ݽӿ�");
					UniLogin.getValidateInfo(function(res){
						showSilence("res:"+res);
						showSilence("res.code:"+res.code);
						showSilence("res.result.idcard_state:"+res.result.idcard_state);
						showSilence("res.result.validateState:"+res.result.validateState);
						if(res==0){//�ӿ�����ʱ
							Anti_reconnect();
							Anti_get_self_role = 0;
						}else{
							if(res.code==300){
								if(res.result.idcard_state==3 && res.result.validateState==1){
									Anti_self_role = 1;
									Anti_get_self_role = 2;
									Anti_close();
								}else if(res.code==3006){//δ��½
									Anti_get_self_role = 0;
									showClientDeniedShowLogin();
								}else{
									Anti_get_self_role = 2;
									Anti_reconnect();
								}
							}else{
								Anti_get_self_role = 0;
								Anti_reconnect();
							}
						}
					});
				}catch(e){
					Anti_get_self_role = 0;
					showClientDeniedForUniLoginFalse();
				}
			}else{
				Anti_get_self_role = 0;
				showClientDeniedForUniLoginFalse();
			}	
		}else if(Anti_get_self_role == 2){
			if(Anti_self_role==1){
				Anti_close();
			}else{
				Anti_reconnect();
			}
		}
	}

	//ͬ����Ϸ�ڵĵ�¼��ҳ��
	try {
		window.addEventListener('message', function (e) {
			if (e.data.eventType === "loginSuccess") {
				Anti_uid = UniLogin.getUid();
				heartBeat();
			}
			if (e.data.eventType === "logoutSuccess") {
				UniLogin.logout();
				window.location.reload();
			}
		}, false);
	} catch (e) { }

	//������Ϣ�����ص�
	if("undefined" != typeof UniLogin){
		unionLoginProps.__closePopupCertifyCallback = function(){
			Anti_reauthentication();
		}
	}


	//��֤�˺�
	function Anti_reauthentication(){
		if(Anti_uid>0){
			$.ajax({
				type:"GET",
				async: false,
				url:Anti_veryUrl+"?userId="+Anti_uid+"&timestamp="+new Date().getTime(),
				dataType:"jsonp",
				callbackParameter:"callback",
				success:function(msg){
					window.location.reload();
				}
			});	
		}
	}


	//������
	function Anti_showSWF(){displayswf();}
	function Anti_hideSWF(){hiddenswf();}
	function Anti_logoutFunc(){
		if("undefined" != typeof UniLogin){
			UniLogin.logout();
		}
	}
	function Anti_getUidFunc(){
		if("undefined" != typeof UniLogin){
			return UniLogin.getUid();
		}else{
			return 0;
		}
	}

	window.Anti_showLogin = function(){
		if("undefined" != typeof UniLogin){
			UniLogin.showPopupLogin(null,null,true);
			$(".login_close").hide();
		}
	}

	window.loginsuccessdo = function(uid){
		if(uid>0){
			Anti_uid = uid;
		}else{
			var Anti_uid = Anti_getUidFunc();
			if(!Anti_uid){Anti_uid=0;}
		}
		heartBeat();
		try{
			loginsuccessdo2();
		}catch(e){}
	}
	window.logoutsuccessdo = function(){
		window.location.reload();
		if(isIniframe()==1){//���
			if(Anti_in_otherdomain==0){
				parent.location.reload();
			}else{
				window.location.reload();
			}
		}
	}

	window.Anti_close = function(){
		$("#Anti_open,#Anti_mask").hide();
		if($("#loginDiv").is(":visible")){
			
		}else{
			Anti_showSWF();
		}
	}

	/***
	������Ϸҳ��js��һЩ��д���� ��ʼ
	***/
	window.loginsuccessdo2 = function(){
		try{
			//hasgetCNXH = 0;
			//hasgetPlayed = 0;
			if("undefined" != typeof UniLogin){
				var uid = UniLogin.getUid();
				var uname = UniLogin.getDisplayNameText();
			}
			if(uid>0){
				
				$("#userPIC0").attr('src','//a.img4399.com/'+uid+'/small');
				$("#userNicks0").html(uname);
				$("#userPIC").attr('src','//a.img4399.com/'+uid+'/small');
				$("#userNicks").html(uname);
				$("#logined").show();
				
				$("#showword").hide();
				$("#reading1").hide();
				$("#reading2").hide();
				$("#morediv").attr("href","//my.4399.com/shoucang/?m=Recommend");
				$("#moredivplay").attr("href","//my.4399.com/shoucang/?m=PlayLog");
			}
		}catch(e){}
	}
	
	
	
	if (typeof hiddenswf === "function"){
		
	}else{
		window.hiddenswf = function(){try{document.getElementById("pusher").style.display = "block";document.getElementById("pusher").style.height="2000px";}catch(e){}}
	}
	
	if (typeof displayswf === "function"){
		
	}else{
		window.displayswf = function(){try{document.getElementById("pusher").style.display = "none";document.getElementById("pusher").style.height="0px";}catch(e){}}
	}
	
	if("undefined" == typeof window._playMode){
		window._playMode = 4;
	}

	/***
	������Ϸҳ��js��һЩ��д���� ����
	***/
	
	
	//ת������
	function transform (data) {
		for (var key in data) {
		if (typeof data[key] === 'object') {
				transform(data[key]);
			} else if (typeof data[key] === 'string') {
				data[key] = decodeURIComponent(data[key]);
				data[key] = data[key].replace(/\\/g, '').replace(/\\"/g, '"').replace(/\+/g, ' ');
			}
		}
	}


	//��������	
	function heartBeat(){
		checkTopAntiindulgence();
		if(Anti_golbalRunning==1){
			var Anti_uid2 = Anti_getUidFunc();
			if(!Anti_uid2){Anti_uid2=0;}
			
			if(Anti_uid2!=Anti_uid){
				Anti_uid = Anti_uid2;
				Anti_token = "";
				Anti_verify_status = '';
				Anti_idcard_status = "";
			}
			
			//����10���ڵ��ظ�����
			var Anti_difftime = new Date().getTime() - parseInt(Anti_lastRequestTime);
			
			if(Anti_uid>=0){
				if(parseInt(Anti_lastRequestTime)==0 || parseInt(Anti_difftime)>=parseInt(Anti_minReauestTime)){
					Anti_lastRequestTime = new Date().getTime();
					var params = 'urlencode';
					$.ajax({
						type:"GET",
						url:"//apps.4399.com/online/heartbeat?ptid="+Anti_ptid+"&uid="+Anti_uid+"&gid="+Anti_gid+"&token="+Anti_token+"&result_encode="+params+"&is_adult="+Anti_idcard_status+"&verify_status="+Anti_verify_status+"&refresh="+Anti_refresh+"&not_login="+Anti_not_login+"&timestamp="+new Date().getTime(),
						dataType:"jsonp",
						callbackParameter:"callback",
						timeout:3000,
						success:function(msg){
							Anti_refresh = 0;
							transform(msg);
							if(msg['result']){
								var Anti_interval = parseInt(msg['result']['interval']);
								if(Anti_interval*1000<parseInt(Anti_minReauestTime)){Anti_minReauestTime=Anti_interval*1000;}
								Anti_token = msg['result']['token'];
								Anti_idcard_status = msg['result']['idcard_status'];//�û�����
								Anti_verify_status = msg['result']['verify_status'];

								//�����˵���� ���û����ݴ�����ҳ��  show_adult_notice_in_page ������Ҫ��ʹ�õ�ҳ����ж���
								if(Anti_idcard_status==1 && Anti_verify_status==1){
									try{
										window.show_adult_notice_in_page();
									}catch(e){
										try{
											top.show_adult_notice_in_page();
										}catch(e){}
									}
								}

							}
							if(msg.code==100){//�û�����Ҫ���з��������ƣ�������Ҫ���󱾽ӿ�
								Anti_connectNever = 0;
								stopBeat();
								Anti_close();
							}else if(msg.code==200){//�û���Ҫ���������ƣ�����ʣ����Ϸʱ����������Ϸ
								Anti_connectNever = 0;
								if($("#Anti_title").html()=="�����쳣����"){
									Anti_close();
								}
								beat(Anti_interval);
							}else if(msg.code==201){//�û���Ҫ���������ƣ������û�������Ϸ����ʱ��������Ϸ
								Anti_connectNever = 0;
								showWindows(msg);
								beat(Anti_interval);
							}else if(msg.code==202){//����ʱ
								Anti_connectNever = 0;
								showWindows(msg);
								beat(Anti_interval);
							}else if(msg.code==203){//�û���Ҫ���������ƣ����������û������Ϣ���磺���û�����������Ϣ�����û���Ϸʱ�����ޡ���ǰΪ��ֹ��Ϸʱ�εȣ�����ֹ��Ϸ��
								Anti_connectNever = 0;
								showWindows(msg);
								stopGame();
								stopBeat();
								showSilence("203ֹͣ");
							}else if(msg.code==205){//ǿ�Ƶ�¼
								Anti_connectNever = 0;
								if("undefined" != typeof UniLogin){
									UniLogin.showPopupLogin(null,null,true);
									$(".login_close").hide();
								}
							}else if(msg.code==401){//�����쳣
								showSilence("�����Բ����쳣");
								Anti_retry();
							}else if(msg.code==402){//token�쳣������״���£��������token���·���һ������
								Anti_token = '';
								Anti_retry();
							}else if(msg.code==403){//�������쳣
								showSilence("�����Է������쳣");
								Anti_retry();
							}else if(msg.code>500){//����������
								Anti_retry();
							}
						},  
						error:function(XMLHttpRequest, textStatus, errorThrown) { 
							showSilence("error��������");
							Anti_retry();
						},  
						complete : function(XMLHttpRequest,status){
							if(status=='timeout'){
								showSilence("timeout��������");
								Anti_retry();
							}
						}
					});	
				}
			}
		}
	}
	
	
	//�쳣����
	window.Anti_retry = function(){
		if(Anti_uid>0){
			if(Anti_openClientBaseLine==1){
				showSilence("�쳣��������");
				Anti_get_sele_role();
			}
		}else{
			if(Anti_openClientBaseLine==1){
				showClientDeniedShowLogin();
			}
		}
	}

	function Anti_reconnect(){
		//�����û����ͨ�������������� �����ϵ�������
		if(Anti_connectNever==1){
			//����
			showClientDenied();
		}else{
			//����N�κ󵯳�����
			showSilence("����"+Anti_connectRetryTimes+"��");
			if(Anti_connectRetryTimes<Anti_connectRetryMaxTimes){
				Anti_connectRetryTimes++;
				beat(20);
			}else{
				//����
				showClientDenied();
			}
		}
	}
	
	//����
	window.Anti_resumeNext = function(){
		$("#Antibutton").html('<span class="btn-fcmprimary">���ڳ�������...</span>').show();
		Anti_lastRequestTime = 0;
		heartBeat();
	}

	//�ͻ��˴�����¼
	window.Anti_showLoginClient = function(){
		Anti_lastRequestTime = 0;
		Anti_close();
		Anti_showLogin();
	}
	
	//�ͻ��˵�����¼�����
	function showClientDeniedShowLogin(){
		$("#Anti_title").html("�����쳣����");
		$("#Anti_content").html('<p align="center">��ǰ��������쳣��δ��⵽��¼�˺ţ������µ�¼</p>');
		$("#Antibutton").html('<span class="btn-fcmprimary" onclick="Anti_showLoginClient();return false;">��¼</span>').show();
		$("#Anti_tips_show,.countDown").hide();
		$("#Anti_open,#Anti_mask").show();
		Anti_hideSWF();
	}
	
	//�ͻ��˾ܾ����
	function showClientDenied(){
		$("#Anti_title").html("�����쳣����");
		$("#Anti_content").html('<p align="center">'+Anti_clientBaselineWord+'</p>');
		$("#Antibutton").html('<span class="btn-fcmprimary" onclick="Anti_resumeNext();return false;">����</span>').show();
		$("#Anti_tips_show,.countDown").hide();
		$("#Anti_open,#Anti_mask").show();
		Anti_hideSWF();
	}

	//�����û�����js����
	function showClientDeniedForUniLoginFalse(){
		$("#Anti_title").html("�����쳣����");
		$("#Anti_content").html('<p align="center">'+Anti_clientBaselineWord+'</p>');
		$("#Antibutton").html('<span class="btn-fcmprimary" onclick="Anti_hqshjg();return false;">ˢ��</span>').show();
		$("#Anti_tips_show,.countDown").hide();
		$("#Anti_open,#Anti_mask").show();
		Anti_hideSWF();
	}
	
	//�����˺�
	window.Anti_wssfxx = function(){
		if(Anti_uid>0){
			if("undefined" != typeof UniLogin){
				UniLogin.showPopupCertify();
			}
		}
	}
	
	//δ��֤�˺�ˢ����֤״̬
	window.Anti_hqshjg = function(){
		window.location.reload();
	}
	
	//ȷ����
	window.Anti_exit_popup = function(){
		Anti_close();
	}
	
	//�����¼
	window.Anti_login = function(){
		if("undefined" != typeof UniLogin){
			UniLogin.showPopupLogin(null,null,true);
			$(".login_close").hide();
			Anti_close();
			Anti_lastRequestTime = 0;
		}
	}
	
	//������ҳ
	window.Anti_go_to_main = function(){
		if(isIniframe()==1){
			if(Anti_in_otherdomain==0){
				parent.location.href = "//www.4399.com";
			}else{
				window.location.href = "//www.4399.com";
			}
		}else{
			window.location.href = "//www.4399.com";
		}
	}
	

	//�л��˺�
	window.Anti_switch_account = function(){
		Anti_logoutFunc();
		window.location.reload();
	}
	
	//��֤����
	window.Anti_refresh_idcard = function(){
		Anti_idcard_status = "";
		Anti_verify_status = "";
		Anti_refresh = 1;
		
		if(Anti_refreshtimes==0){
			Anti_reauthentication();
			Anti_refreshtimes = 1;
		}
		
		alert("ˢ�����ݳɹ�");
	}
	
	//����ʱ����
	window.Anti_secoundCoverMinute = function(){
		var strs = '';

		Anti_before_start --;
		
		var days = Math.floor(Anti_before_start / (60 * 60 * 24)) + '';
		
		var hours = Math.floor((Anti_before_start - days*86400) / (60 * 60)) + '';
		if(hours.length == 1){
			hours = '0' + hours;
		}
		var mins = (Math.floor((Anti_before_start / 60) % 60)) + '';
		if(mins.length == 1){
			mins = '0' + mins;
		}
		var secs = Math.floor(Anti_before_start % 60) + '';
		if(secs.length == 1){
			secs = '0' + secs;
		}
		if(days>0){
			strs = strs + days +'��';
		}
		if(hours>0){
			strs = strs + hours + 'ʱ';
		}else{
			if(days>0){
				strs = strs + hours + 'ʱ';
			}
		}
		if(mins>0){
			strs = strs + mins + '��';
		}else{
			if(hours>0){
				strs = strs + mins + '��';
			}
		}
		strs = strs + secs + '��';
		
		if(Anti_before_start_text.indexOf('before_start')==-1){//��ʾ�İ�
			$("#Anti_beforeCount").html(Anti_before_start_text).show();
		}else{//��ʾ����ʱ
			$(".txt2").html(strs);
		}
		showSilence("countdown"+strs);
		
		if(Anti_before_start == 0){
			showSilence("countdown:finish");
			clearInterval(Anti_clearId);
			Anti_close();
			Anti_token = "";
			Anti_verify_status = "";
			Anti_idcard_status = "";
			Anti_not_login = 1;
			heartBeat();
			return;
		}
	}
	
	
	function showWindows(msg){
		checkTopAntiindulgence();
		if(Anti_golbalRunning==1){
			var Anti_interval = msg['result']['interval'];
			var Anti_token = msg['result']['token'];
			var Anti_time_remaining = msg['result']['time_remaining'];//��Ϸʣ������
			
			$("#Anti_beforeCount").hide();
			
			//���浯��
			if(msg['result']['pop_config']){
				var Anti_title = msg['result']['pop_config'][0]['title'];//����
				var Anti_content = msg['result']['pop_config'][0]['content'];
				var Anti_tips = msg['result']['pop_config'][0]['tips'];// ��ܰ��ʾ���ݿ���Ϊ�գ���Ϊ��ʱ�����ء���ܰ��ʾ����ʾ����
				var Anti_buttons = msg['result']['pop_config'][0]['buttons'];//��ť
				if(msg['result']['pop_config'][0]['before_start_text']){
					Anti_before_start_text = msg['result']['pop_config'][0]['before_start_text'];
				}
				if(msg['result']['pop_config'][0]['before_start']){
					Anti_before_start = parseInt(msg['result']['pop_config'][0]['before_start']);
				}
				var Anti_buttonstr = "";
			
				if(Anti_buttons){
					for(var i=0;i<Anti_buttons.length;i++){
						var Anti_buttons_name = Anti_buttons[i]['name'];
						var Anti_buttons_func = Anti_buttons[i]['func'];
						var Anti_buttons_urlinfo = Anti_buttons[i]['url_info'];
					}
				}

				$("#Anti_title").html(Anti_title);
				$("#Anti_content").html(Anti_content);
				$("#Anti_open,#Anti_mask").show();
				showSilence("----------------"+Anti_before_start_text+"---------------------");
				showSilence("----------------"+Anti_before_start+"---------------------");
				//����ı��к���ռλ�� ����ʾ����ʱ ������ں�̨ĬĬ����
				if(Anti_before_start_text){
					//����ʱ����
					if(Anti_before_start>0 && Anti_countDowning==0){
						Anti_countDowning = 1;
						Anti_clearId = setInterval('Anti_secoundCoverMinute()' , 1000);
						$("#Anti_beforeCount").html(Anti_before_start_text.replace("%before_start%","ʱ�����ڶ�ȡ��...")).show();
					}
				}
				
				if(Anti_tips){
					$("#Anti_tips").html(Anti_tips);
					$("#Anti_tips_show").show();
				}
				if(Anti_buttons){
					for(var i=0;i<Anti_buttons.length;i++){
						var Anti_buttons_name = Anti_buttons[i]['name'];
						var Anti_buttons_func = Anti_buttons[i]['func'];

						//�ж�΢�ˣ����ȷ����ť���ص�
						if(checkUaHasPlatform(/\|4399\.air\.wd\|/)){
							if(Anti_buttons_func !='go_to_main'){
								Anti_buttonstr += '<span class="btn-fcmprimary" onclick="Anti_'+Anti_buttons_func+'();return false;" id="btn_'+Anti_buttons_func+'">'+Anti_buttons_name+'</span>';
							}
						}else{
							Anti_buttonstr += '<span class="btn-fcmprimary" onclick="Anti_'+Anti_buttons_func+'();return false;" id="btn_'+Anti_buttons_func+'">'+Anti_buttons_name+'</span>';
						}
					}
					if(Anti_buttonstr){
						$("#Antibutton").html(Anti_buttonstr).show();
					}
				}
				Anti_hideSWF();
			}
			
			//����ʱ
			if(msg['result']['countdown']){
				var Anti_countdown = msg['result']['countdown'];
				if(Anti_countdown){
					for(var i=0;i<Anti_countdown.length;i++){
						var Anti_buttonstr2 = '';
						var Anti_title_countdown = Anti_countdown[i]['title'];
						var Anti_content_countdown = Anti_countdown[i]['content'];
						var Anti_tips_countdown = Anti_countdown[i]['tips'];
						//����ʱʱ��
						var Anti_moment_countdown = Anti_countdown[i]['moment'];
						//����ʱ��ť
						var Anti_buttons_countdown = Anti_countdown[i]['buttons'];
						if(Anti_buttons_countdown){
							for(var ii=0;ii<Anti_buttons_countdown.length;ii++){
								var Anti_buttons_name = Anti_buttons_countdown[ii]['name'];
								var Anti_buttons_func = Anti_buttons_countdown[ii]['func'];
								Anti_buttonstr2 += '<span class="btn-fcmprimary" onclick="Anti_'+Anti_buttons_func+'();return false;">'+Anti_buttons_name+'</span>';
							}
						}
						var myArray = {
							"moment" : Anti_moment_countdown,
							"title" : Anti_title_countdown,
							"content" : Anti_content_countdown,
							"tips" : Anti_tips_countdown,
							"buttons" : Anti_buttonstr2
						};
						if(Anti_moment_countdown>0){
							if($.inArray(Anti_moment_countdown,countdowntime)==-1){
								countdowntime.push(Anti_moment_countdown);
								countdowninfo.push(myArray);
							}
						}
					}
				}
			}
			
			//ʱ��ﵽ����offline
			if(msg['result']['offline']){
				var Anti_buttonstr3 = "";
				var Anti_offline = msg['result']['offline'];
				var Anti_title_offline = Anti_offline['title'];
				var Anti_content_offline = Anti_offline['content'];
				var Anti_tips_offline = Anti_offline['tips'];
				var Anti_buttons_offline = Anti_offline['buttons'];
				if(Anti_buttons_offline){
					for(var j=0;j<Anti_buttons_offline.length;j++){
						var Anti_buttons_name = Anti_buttons_offline[j]['name'];
						var Anti_buttons_func = Anti_buttons_offline[j]['func'];							
						Anti_buttonstr3 += '<span class="btn-fcmprimary" onclick="Anti_'+Anti_buttons_func+'();return false;">'+Anti_buttons_name+'</span>';
					}
				}
				
				offlineinfo = {
					"title" : Anti_title_offline,
					"content" : Anti_content_offline,
					"tips" : Anti_tips_offline,
					"buttons" : Anti_buttonstr3
				}
				
				showSilence("************ offline ************");
				showSilence(offlineinfo);
				showSilence("************ offline ************");
			}
			
			
			showSilence("************ countdowninfo-before ************");
			showSilence(countdowninfo);
			showSilence("************ countdowninfo-before ************");
			
			
			//��ʾ���ܵĵ���ʱ����
			showSilence("��ǰ����������"+countdowninfo.length);
			if(countdowninfo.length>0){
				showSilence("Ŀǰʣ�൹��ʱ��������"+countdowninfo.length);
				for(var a=0;a<countdowninfo.length;a++){
					showSilence("Ŀǰʣ��ʱ�䣺"+parseInt(Anti_time_remaining));
					showSilence("������¼��ʱ������"+parseInt(countdowninfo[a]['moment']));
					if(parseInt(Anti_time_remaining)<=parseInt(countdowninfo[a]['moment']) && parseInt(Anti_time_remaining)>0){
						showSilence("ƥ�䵽��������"+parseInt(countdowninfo[a]['moment']));
						$("#Anti_title").html(countdowninfo[a]['title']);
						$("#Anti_content").html(countdowninfo[a]['content']);
						$("#Anti_open,#Anti_mask").show();
						if(countdowninfo[a]['tips']){
							$("#Anti_tips").html(countdowninfo[a]['tips']);
							$("#Anti_tips_show").show();
						}
						if(countdowninfo[a]['buttons']){
							$("#Antibutton").html(countdowninfo[a]['buttons']).show();
						}
						countdowninfo[a]['moment'] = -1;
						Anti_hideSWF();
					}
				}
			}
			
			showSilence("************ countdowninfo-after ************");
			showSilence(countdowninfo);
			showSilence("************ countdowninfo-after ************");
			
			
			showSilence("************ offlineinfo ************");
			showSilence(offlineinfo);
			showSilence("************ offlineinfo ************");
			
			//offline����
			if(offlineinfo.length>0){
				if(Anti_time_remaining<=0){
					$("#Anti_title").html(offlineinfo['title']);
					$("#Anti_content").html(offlineinfo['content']);
					$("#Anti_open,#Anti_mask").show();
					if(offlineinfo['tips']){
						$("#Anti_tips").html(offlineinfo['tips']);
						$("#Anti_tips_show").show();
					}
					if(offlineinfo['buttons']){
						$("#Antibutton").html(offlineinfo['buttons']).show();
					}
					Anti_hideSWF();
				}
			}
		}
	}
	
	
	

	

	function beat(interval){
		interval = parseInt(interval);
		if(interval>0){
			stopBeat();
			if(interval*1000<parseInt(Anti_minReauestTime)){Anti_minReauestTime=interval*1000;}
			Anti_bthandle = setInterval(heartBeat,interval*1000);//1000
		}else{
			stopBeat();
		}
	}
	
	function stopBeat(){
		clearInterval(Anti_bthandle);
	}

	function stopGame(){
		Anti_hideSWF();
	}

	function showSilence(str){
		try{
			console.info(str);
		}catch(e){}
	}

	//UI��ʼ��
	function append() {
		var cssText='*{margin:0;padding:0}ul{list-style:none;}.fl{float:left;}.fr{float:right;}.sdkDialog{position:absolute;left:50%;top:50%;margin:-210px 0 0 -309px;width:618px;z-index:20020}.sdkDialog .fcmdialog{color:black;position:absolute;left:0;top:0;width:620px;padding-bottom:30px;font-family:"microsoft yahei";font-size:14px;background:#fff;border-radius:8px;}.sdkDialog .fcmdialog .close-btn{position:absolute;right:0;top:0;width:40px;height:40px;background-color:red;line-height:40px;cursor:pointer;display:none}.sdkDialog .fcmdialog .title{line-height:30px;text-align:center;font-size:22px;font-weight:700;padding:25px 0 0;margin:0 40px;color:#454545;border:0;height:auto;float:none;width:auto;text-indent:0;}.sdkDialog .fcmdialog .stitle{text-align:left;line-height:1.6;margin:15px 40px 0;font-size:16px;}.sdkDialog .fcmdialog .stitle span{color:#ffa92d;}.sdkDialog .fcmdialog .mod-tip{margin:20px 40px 0;background:#F0F0F0;padding:12px 15px;border-radius:4px;color:#333;text-align:left}.sdkDialog .fcmdialog .tip-title{font-size:16px;font-weight:400;}.sdkDialog .fcmdialog .tip-info{margin-top:5px;line-height:26px;font-size:14px;}.sdkDialog .fcmdialog .tip-info li{font-size:16px;line-height:26px}.sdkDialog .fcmdialog .tip-info a{color:#FAA61B;text-decoration:underline;margin:0 4px;cursor:pointer;}.sdkDialog .fcmdialog .mod-btn{text-align:center;font-size:0;line-height:0;margin:25px 40px 0;}.sdkDialog .fcmdialog .mod-btn .btn-fcmprimary{display:inline-block;width:140px;height:38px;line-height:38px;border:1px solid #69bb01;color:#69bb01;font-size:14px;margin:0 15px;border-radius:5px;cursor:pointer;}.sdkDialog .fcmdialog .mod-btn .fr,.sdkDialog .fcmdialog .mod-btn .fl{width:250px;margin:0;}.sdkDialog .fcmdialog .mod-btn .btn-fcmprimary:hover{-webkit-filter:brightness(1);filter:brightness(1)}.sdkDialog .fcmdialog .mod-btn .btn-identity{background-color:#69bb01;color:#f8ffef}.fcmIframe{position:absolute;left:50%;top:270px;margin:0 0 0 -309px;width:618px;height:354px;z-index:2019;border:0 none;background-color:#000}.countDown{background:#eee;border-radius:3px;padding:10px;text-align:center;margin:20px 40px 0;font-size:16px;color:#666}.countDown .txt1{font-size:16px;height:28px;line-height:28px;color:#717171;}.countDown .txt2{height:40px;line-height:40px;font-size:26px;font-weight:bold;color:#54ba3d;}.cmMask{display:none;width:100%;position:absolute;left:0;top:0;background:url(/images/Antiindulgence/ptlogin_mask.png) repeat;background:rgba(0,0,0,.8);_background:url(about:blank);_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=scale,src="/images/Antiindulgence/ptlogin_mask.png");}';
		$('head').append('<style>'+cssText+'</style>');

		var mask =  '<div class="cmMask" style=" height:24200px; z-index:9999;" id="Anti_mask">';
		var pcstr = [
			'<div class="sdkDialog" id="Anti_open" style="display:none">',
			'	<div class="fcmdialog">',
			'		<span id="Anticlose" onclick="Anti_close();return false;" class="close-btn">�ر�</span>',
			'		<h2 class="title" id="Anti_title"></h2>',
			'		<div class="stitle" id="Anti_content"></div>',
			
			'        <div class="countDown" style="display:none" id="Anti_beforeCount">',
            '            <p class="txt1"></p>',
            '            <p class="txt2"></p>',
            '        </div>',
            '        <div class="countDown" style="display:none">',
            '            ��ǰ��������Ϸ',
            '        </div>',
			
			'		<div class="mod-tip" id="Anti_tips_show" style="display:none">',
			'			<h3 class="tip-title">��ܰ��ʾ��</h3>',
			'			<ul class="tip-info" id="Anti_tips"></ul>',
			'		</div>',
			'		<div class="mod-btn" id="Antibutton" style="display:none"></div>',
			'	</div>',
			'</div>',
		];
		$("body").append(pcstr.join(''));
		$("body").append(mask);
		
		//���ص�¼
		$("#login_tologin_A").attr("target","_self");
		$("#login_tologin_A").attr("href","javascript:Anti_showLogin");
		$("#login_toregister_A").attr("target","_self");
		if("undefined" != typeof UniLogin){
			$("#login_toregister_A").attr("href","javascript:UniLogin.showPopupReg(true)");
		}
	}
});
	if(window.location.host=="www.4399.com" || window.location.host=="h.4399.com"  || window.location.host=="zuopin.4399.com" || window.location.host=="h.api.4399.com" || window.location.host=="zxwyouxi.com"){
		//����F12
		$(document).keydown(function(event){
			if(event.keyCode==123){
				if(event.preventDefault){
					event.preventDefault();
				}else{
					window.event.returnValue == false;
				}
			}
		}); 
		//����ctrl+shift+i
		$(document).keydown(function(event){
		����if(event.ctrlKey && event.shiftKey && event.keyCode==73){
				if(event.preventDefault){
					event.preventDefault();
				}else{
					window.event.returnValue == false;
				}
		����}
		});
		// Ϊ�Ҽ������Զ����¼������Խ���
		$(document).ready(function(){
			$(document).bind("contextmenu",function(e){
				return false;
			});
		});


		function consoleOpenCallback() {
			alert('�رյ��Դ�');
			window.location.reload();
		}

		var Anti_numtots = 0;
		(function () {
			window._windon_handler = setInterval( function() {
				var before = new Date();
				debugger;
				var after = new Date();
				if (after.getTime() - before.getTime() > 100) {
					if (after.getTime() - before.getTime() > 2000) {
						consoleOpenCallback();
						clearInterval(_windon_handler);
					}else{
						Anti_numtots++;
						if(Anti_numtots>=2){
							consoleOpenCallback();
							clearInterval(_windon_handler);
						}
					}
				}else{
					Anti_numtots = 0;
				}
			}, 1000)
		})();
	}