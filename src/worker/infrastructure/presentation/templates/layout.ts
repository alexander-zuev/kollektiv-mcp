interface LayoutProps {
  title: string;
  description?: string;
  additionalHead?: string;
  bodyClass?: string;
  posthogKey?: string;
}

export function createLayout(props: LayoutProps, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800;900&display=swap"
          rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet">

    <!-- Phosphor Icons -->
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css">

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${props.title}</title>
  ${props.description ? `<meta name="description" content="${props.description}">` : ''}
  <link rel="stylesheet" href="/styles.css">
  ${props.additionalHead || ''}
  
    <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/logo.svg"/>

  <!-- Theme Color -->
  <meta name="theme-color" content="#3b82f6">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://claudeportable.dev/">
  
  ${
    props.posthogKey
      ? `<!-- PostHog Analytics -->
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Ie Ts Ms Ee Es Rs capture Ge calculateEventProperties Os register register_once register_for_session unregister unregister_for_session js getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Ds Fs createPersonProfile Ls Ps opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Cs debug I As getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('${props.posthogKey}', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-05-24',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    })
</script>`
      : ''
  }
</head>
<body class="min-h-screen bg-background text-foreground">
  ${content}
</body>
</html>`;
}