import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:graphql_contacts/src/app_startup.dart';
import 'package:graphql_contacts/src/routing/not_found_screen.dart';
import 'package:graphql_contacts/src/screen/home_screen.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'router.g.dart';

@riverpod
GoRouter router(RouterRef ref) {
  final appStartupState = ref.watch(appStartupProvider);
  return GoRouter(
    routes: $appRoutes,
    initialLocation: '/home',
    errorBuilder: (_, __) => const NotFoundScreen(),
    redirect: (_, state) {
      if (appStartupState.isLoading || appStartupState.hasError) {
        return '/startup';
      }
      return state.path;
    },
  );
}

@TypedGoRoute<AppStartupWidgetRoute>(
  path: '/startup',
)
@immutable
class AppStartupWidgetRoute extends GoRouteData {
  const AppStartupWidgetRoute();

  @override
  CustomTransitionPage buildPage(BuildContext context, GoRouterState state) {
    return NoTransitionPage(
      key: state.pageKey,
      child: AppStartupWidget(
        onLoaded: (_) => const SizedBox.shrink(),
      ),
    );
  }
}

@TypedGoRoute<HomeScreenRoute>(
  path: '/home',
)
@immutable
class HomeScreenRoute extends GoRouteData {
  const HomeScreenRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const HomeScreen();
  }
}
