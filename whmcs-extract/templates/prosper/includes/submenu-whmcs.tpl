{*

--------------------------------------------
---------   Looking to make edits?   -------
--------------------------------------------

You can edit your template without editing this file directly.

For more information about editing your template please refer to our full documentation below:

https://www.zomex.com/docs/whmcs-templates/

Feel free to contact Zomex if you run into any issues or have any questions.

--------------------------------------------

*}

{if $loggedin}

	{if $filename eq "clientarea" || $filename eq "submitticket" || $filename eq "supporttickets" || $templatefile eq "announcements" || $templatefile eq "viewannouncement" || $templatefile eq "knowledgebase" || $templatefile eq "knowledgebasearticle" || $templatefile eq "knowledgebasecat" || $templatefile eq "downloads" || $templatefile eq "downloadscat" || $filename eq "serverstatus" || $filename eq "affiliates" || $templatefile eq "account-user-management" || $templatefile eq "account-contacts-manage" || $templatefile eq "user-profile" || $templatefile eq "user-password"}

		<div class="whmcssubmenu">
			
			<div class="contentcontainer">
	
			    <header id="header" class="header">
			        <div class="navbar navbar-light">
			            <div class="container-fluid">
			                <ul class="navbar-nav toolbar">
			                    <li class="nav-item ml-3 d-xl-none">
			                        <button class="btn nav-link" type="button" data-toggle="collapse" data-target="#mainNavbar">
			                            <span class="fas fa-bars fa-fw"></span>
			                        </button>
			                    </li>
			                </ul>
			            </div>
			        </div>
			        <div class="navbar navbar-expand-xl main-navbar-wrapper">
			            <div class="container-fluid">
			                <div class="collapse navbar-collapse" id="mainNavbar">
			                    <ul id="nav" class="navbar-nav mr-auto">
			                        {include file="$template/includes/navbar.tpl" navbar=$primaryNavbar}
			                    </ul>
			                    <ul class="navbar-nav ml-auto">
			                        {include file="$template/includes/navbar.tpl" navbar=$secondaryNavbar rightDrop=true}
			                    </ul>
			                </div>
			            </div>
			        </div>
			    </header>
	    
				<div class="clear">&nbsp;</div>
	    
			</div><!-- .contentcontainer -->
	    
		</div><!-- .whmcssubmenu -->
        
    {/if}    

{/if}