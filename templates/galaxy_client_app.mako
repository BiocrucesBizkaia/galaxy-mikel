<%def name="render_json( dictionary )">
${ h.dumps( dictionary, indent=( 2 if trans.debug else 0 ) ) }
</%def>

## ============================================================================

<%def name="load( app=None, **kwargs )">
    <script type="text/javascript">

        var bootstrapped = {};
        %for key in kwargs:
            bootstrapped[ '${key}' ] = (
                ${ render_json( kwargs[ key ] ) }
            );
        %endfor

        window.Galaxy = new window.top.bundleEntries.GalaxyApp({
            root               : '${h.url_for( "/" )}',
            config             : ${ render_json( get_config_dict() )},
            user               : ${ render_json( get_user_dict() )},
            session_csrf_token : '${ trans.session_csrf_token }'
        }, bootstrapped );

        %if app:
            require([ '${app}' ]);
        %endif
        
    </script>
</%def>


## ----------------------------------------------------------------------------
<%def name="get_config_dict()">
    ## Return a dictionary of galaxy.ini settings
    <%
        config_dict = {}
        try:
            controller = trans.webapp.api_controllers.get( 'configuration', None )
            if controller:
                config_dict = controller.get_config_dict( trans, trans.user_is_admin )
        except Exception as exc:
            pass
        return config_dict
    %>
</%def>

<%def name="get_config_json()">
    ## Conv. fn to write as JSON
${ h.dumps( get_config_dict() )}
</%def>


## ----------------------------------------------------------------------------
<%def name="get_user_dict()">
    ## Return a dictionary of user or anonymous user data including:
    ##  email, id, disk space used, quota percent, and tags used
    <%
        from markupsafe import escape
        user_dict = {}
        try:
            if trans.user:
                user_dict = trans.user.to_dict( view='element',
                    value_mapper={ 'id': trans.security.encode_id, 'total_disk_usage': float, 'email': escape, 'username': escape } )
                user_dict[ 'quota_percent' ] = trans.app.quota_agent.get_percent( trans=trans )
                user_dict[ 'is_admin' ] = trans.user_is_admin

                # tags used
                users_api_controller = trans.webapp.api_controllers[ 'users' ]
                tags_used = []
                for tag in users_api_controller.get_user_tags_used( trans, user=trans.user ):
                    tag = escape( tag )
                    if tag:
                        tags_used.append( tag )
                user_dict[ 'tags_used' ] = tags_used

                return user_dict

            usage = 0
            percent = None
            try:
                usage = trans.app.quota_agent.get_usage( trans, history=trans.history )
                percent = trans.app.quota_agent.get_percent( trans=trans, usage=usage )
            except AssertionError as assertion:
                # no history for quota_agent.get_usage assertion
                pass
            return {
                'total_disk_usage'      : int( usage ),
                'nice_total_disk_usage' : util.nice_size( usage ),
                'quota_percent'         : percent
            }

        except Exception as exc:
            pass
            #TODO: no logging available?
            #log.exception( exc )

        return user_dict
    %>
</%def>

<%def name="get_user_json()">
    ## Conv. fn to write as JSON
${ h.dumps( get_user_dict() )}
</%def>
