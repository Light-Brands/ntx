# Mobile-First Development Principles

> **Status**: 🚧 In Progress | **Last Updated**: [Date] | **Owner**: [Name]

This document defines mobile-first development principles, iOS/Android best practices, and platform-specific considerations. All features must be built mobile-first.

## 🎯 Core Philosophy

### Mobile-First Means:
1. **Design for mobile FIRST**, then adapt to larger screens
2. **Touch as primary interaction** (not hover/click)
3. **Performance on mobile hardware** (not just desktop)
4. **Offline-first where possible** (unreliable connections)
5. **Battery-conscious** (background processes, polling)
6. **Data-conscious** (cellular data, image sizes)

### NOT Mobile-First:
- ❌ Designing for desktop, then "making it responsive"
- ❌ Assuming fast internet and unlimited data
- ❌ Ignoring platform conventions
- ❌ Treating mobile as an afterthought

---

## 📱 Platform-Specific Guidelines

### iOS Development

**Follow Apple Human Interface Guidelines**

**Navigation Patterns:**
```
✅ Use:
- UINavigationController with large titles
- Swipe-back gesture (always enabled)
- Tab bar for 3-5 primary sections
- Modals for temporary tasks

❌ Avoid:
- Hamburger menus (use tab bar instead)
- Custom back buttons (use native)
- Android-style up navigation
```

**Interaction Patterns:**
```
✅ Use:
- Long press for context menus
- Swipe actions on list items
- Pull to refresh
- Haptic feedback for confirmations
- Share sheet for sharing

❌ Avoid:
- Material Design ripples
- Android-style FABs
- Non-native pickers
```

**Visual Design:**
```
✅ iOS Conventions:
- SF Symbols for icons
- System fonts (San Francisco)
- Native blur effects
- Bottom sheets from bottom
- Action sheets for options

❌ Android Conventions:
- Material Design icons
- Roboto font
- Floating action buttons
```

**Technical Requirements:**
```typescript
// Safe area handling
import { useSafeAreaInsets } from 'react-native-safe-area-context'

function Screen() {
  const insets = useSafeAreaInsets()
  
  return (
    <View style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }}>
      {/* Content */}
    </View>
  )
}

// Haptic feedback
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

function handlePress() {
  ReactNativeHapticFeedback.trigger('impactMedium')
  // ... action
}

// Native modal presentation
<Modal
  presentationStyle="pageSheet" // iOS 13+
  animationType="slide"
>
  {/* Modal content */}
</Modal>
```

### Android Development

**Follow Material Design 3 Guidelines**

**Navigation Patterns:**
```
✅ Use:
- Bottom navigation for 3-5 sections
- Navigation drawer for 6+ sections
- Floating action button for primary action
- Back button support (hardware + gesture)

❌ Avoid:
- iOS-style tab bars without icons
- Swipe-back (not standard on Android)
- Ignoring hardware back button
```

**Interaction Patterns:**
```
✅ Use:
- Material ripple effects
- Swipe to dismiss
- Pull to refresh
- Long press for selection
- Bottom sheets for options
- Snackbars for feedback

❌ Avoid:
- iOS-style action sheets
- iOS-style switches
- Haptic feedback (not universal)
```

**Visual Design:**
```
✅ Android Conventions:
- Material Design icons
- Roboto font family
- Floating action buttons
- Material elevation/shadows
- Bottom sheets from bottom

❌ iOS Conventions:
- SF Symbols
- San Francisco font
- iOS-style blur effects
```

**Technical Requirements:**
```typescript
// Status bar handling
import { StatusBar } from 'react-native'

<StatusBar
  backgroundColor="transparent"
  barStyle="dark-content"
  translucent={true}
/>

// Back button handling
import { BackHandler } from 'react-native'

useEffect(() => {
  const backAction = () => {
    // Handle back button
    return true // Prevent default
  }

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction
  )

  return () => backHandler.remove()
}, [])

// Ripple effects
import { TouchableNativeFeedback } from 'react-native'

<TouchableNativeFeedback
  background={TouchableNativeFeedback.Ripple('#ffffff', false)}
>
  <View>
    {/* Content */}
  </View>
</TouchableNativeFeedback>
```

---

## ⚡ Performance Optimization

### Rendering Performance

**List Optimization:**
```typescript
import { FlashList } from '@shopify/flash-list'

// ✅ Use FlashList for large lists (not FlatList)
<FlashList
  data={items}
  estimatedItemSize={80}
  renderItem={({ item }) => <ListItem item={item} />}
/>

// Memoize list items
const ListItem = React.memo(({ item }) => {
  return <View>{/* Item content */}</View>
})
```

**Image Optimization:**
```typescript
import FastImage from 'react-native-fast-image'

// ✅ Use FastImage with proper sizing
<FastImage
  source={{
    uri: imageUrl,
    priority: FastImage.priority.normal,
  }}
  style={{ width: 100, height: 100 }}
  resizeMode={FastImage.resizeMode.cover}
/>

// Specify image dimensions
<FastImage
  source={{
    uri: `${imageUrl}?w=200&h=200&fit=crop`, // Use image CDN
  }}
  style={{ width: 100, height: 100 }}
/>
```

**Animation Performance:**
```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'

// ✅ Use Reanimated for 60fps animations
function AnimatedComponent() {
  const scale = useSharedValue(1)
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))
  
  const handlePress = () => {
    scale.value = withSpring(1.2)
  }
  
  return (
    <Animated.View style={animatedStyle}>
      {/* Content */}
    </Animated.View>
  )
}
```

### Bundle Size Optimization

**Code Splitting:**
```typescript
// ✅ Lazy load screens
const ProfileScreen = React.lazy(() => import('./screens/ProfileScreen'))
const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'))

// Use with Suspense
<Suspense fallback={<LoadingScreen />}>
  <ProfileScreen />
</Suspense>
```

**Tree Shaking:**
```typescript
// ✅ Import only what you need
import { Button } from '@/components/Button'

// ❌ Import everything
import * as Components from '@/components'
```

### Memory Management

**Image Caching:**
```typescript
// Clear cache when needed
import FastImage from 'react-native-fast-image'

// Clear disk cache
FastImage.clearDiskCache()

// Clear memory cache
FastImage.clearMemoryCache()
```

**Cleanup:**
```typescript
useEffect(() => {
  const subscription = someObservable.subscribe()
  
  return () => {
    // Always clean up
    subscription.unsubscribe()
  }
}, [])
```

---

## 🔌 Offline-First Strategy

### Data Persistence

**Use WatermelonDB for offline-first:**
```typescript
import { Database } from '@nozbe/watermelondb'
import { synchronize } from '@nozbe/watermelondb/sync'

// Sync with backend
await synchronize({
  database,
  pullChanges: async ({ lastPulledAt }) => {
    const response = await api.getChanges(lastPulledAt)
    return {
      changes: response.changes,
      timestamp: response.timestamp,
    }
  },
  pushChanges: async ({ changes }) => {
    await api.pushChanges(changes)
  },
})
```

**Network State:**
```typescript
import NetInfo from '@react-native-community/netinfo'

// Monitor connectivity
const [isConnected, setIsConnected] = useState(true)

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(state.isConnected)
  })
  
  return () => unsubscribe()
}, [])

// Show offline UI
{!isConnected && (
  <OfflineBanner />
)}
```

### Optimistic Updates

```typescript
// Update local state immediately
function createPost(content: string) {
  const tempId = generateTempId()
  
  // Optimistic update
  dispatch(addPost({ id: tempId, content, status: 'pending' }))
  
  // Sync to server
  api.createPost(content)
    .then(serverPost => {
      // Replace temp with server data
      dispatch(updatePost({ id: tempId, ...serverPost, status: 'synced' }))
    })
    .catch(error => {
      // Mark as failed, allow retry
      dispatch(updatePost({ id: tempId, status: 'failed', error }))
    })
}
```

### Conflict Resolution

```typescript
interface SyncConflict {
  localVersion: any
  serverVersion: any
  field: string
}

function resolveConflict(conflict: SyncConflict) {
  // Strategy 1: Last write wins
  return conflict.serverVersion

  // Strategy 2: User chooses
  return await showConflictResolution(conflict)
  
  // Strategy 3: Merge if possible
  return {
    ...conflict.localVersion,
    ...conflict.serverVersion,
    updatedAt: Date.now(),
  }
}
```

---

## 🔋 Battery & Data Optimization

### Background Processing

```typescript
// ❌ Don't poll constantly
setInterval(() => fetchData(), 5000)

// ✅ Use push notifications
import messaging from '@react-native-firebase/messaging'

messaging().onMessage(async remoteMessage => {
  // Handle notification
  updateLocalData(remoteMessage.data)
})

// ✅ Or use smart polling
let pollInterval = 30000 // Start at 30s
const MAX_INTERVAL = 300000 // Max 5 minutes

function smartPoll() {
  fetchData()
    .then(hasNewData => {
      if (hasNewData) {
        // Reset to frequent polling
        pollInterval = 30000
      } else {
        // Gradually increase interval
        pollInterval = Math.min(pollInterval * 1.5, MAX_INTERVAL)
      }
      setTimeout(smartPoll, pollInterval)
    })
}
```

### Data Usage

```typescript
// Check connection type
import NetInfo from '@react-native-community/netinfo'

const state = await NetInfo.fetch()

if (state.type === 'cellular') {
  // Load lower quality images
  imageUrl = `${baseUrl}?quality=low`
} else {
  // Load high quality
  imageUrl = `${baseUrl}?quality=high`
}

// Respect user preferences
const [dataUsage, setDataUsage] = useState<'low' | 'normal' | 'high'>('normal')

// In settings
<Picker
  selectedValue={dataUsage}
  onValueChange={setDataUsage}
>
  <Picker.Item label="Low Data" value="low" />
  <Picker.Item label="Normal" value="normal" />
  <Picker.Item label="High Quality" value="high" />
</Picker>
```

---

## 🎨 Touch Interactions

### Touch Target Sizes

**Minimum sizes:**
- iOS: 44x44 points
- Android: 48x48 dp
- Safe universal: 48x48 dp

```typescript
const styles = StyleSheet.create({
  touchTarget: {
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

// If visual element is smaller, add padding
<TouchableOpacity style={styles.touchTarget}>
  <Icon size={24} /> {/* Visual is 24x24, but touch is 48x48 */}
</TouchableOpacity>
```

### Gesture Handling

```typescript
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'

// Swipe to delete
const swipeGesture = Gesture.Pan()
  .onUpdate((e) => {
    translateX.value = e.translationX
  })
  .onEnd(() => {
    if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
      // Delete item
      onDelete()
    } else {
      // Snap back
      translateX.value = withSpring(0)
    }
  })

<GestureDetector gesture={swipeGesture}>
  <Animated.View style={animatedStyle}>
    {/* Item content */}
  </Animated.View>
</GestureDetector>
```

---

## ♿ Mobile Accessibility

### Screen Reader Support

```typescript
import { AccessibilityInfo } from 'react-native'

// Check if screen reader is enabled
const [screenReaderEnabled, setScreenReaderEnabled] = useState(false)

useEffect(() => {
  AccessibilityInfo.isScreenReaderEnabled().then(setScreenReaderEnabled)
  
  const subscription = AccessibilityInfo.addEventListener(
    'screenReaderChanged',
    setScreenReaderEnabled
  )
  
  return () => subscription.remove()
}, [])

// Accessible components
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Delete post"
  accessibilityHint="Double tap to delete this post permanently"
  accessibilityRole="button"
>
  <Icon name="trash" />
</TouchableOpacity>

// Group related elements
<View
  accessible={true}
  accessibilityLabel="Post by John Doe, 2 hours ago"
>
  <Text>{author}</Text>
  <Text>{timestamp}</Text>
  <Text>{content}</Text>
</View>
```

### Dynamic Type Support

```typescript
import { useWindowDimensions, PixelRatio } from 'react-native'

// Scale font with system settings
const fontScale = PixelRatio.getFontScale()

const styles = StyleSheet.create({
  text: {
    fontSize: 16 * fontScale,
    lineHeight: 24 * fontScale,
  },
})

// Test at 200%+ zoom
// Settings → Accessibility → Display & Text Size → Larger Text
```

---

## 🚀 App Store Optimization

### App Store Requirements

**iOS:**
- App Store icon: 1024x1024px
- Screenshots: Various sizes for different devices
- Privacy policy required
- Age rating
- App Store review guidelines compliance

**Android:**
- Feature graphic: 1024x500px
- Screenshots: Minimum 2, max 8
- Privacy policy required
- Content rating
- Play Store policy compliance

### App Performance

**Launch Time:**
- iOS: < 400ms to first frame
- Android: < 5 seconds cold start
- Measure with: Xcode Instruments / Android Profiler

**App Size:**
- Target: < 50MB download size
- Use app thinning (iOS)
- Use App Bundle (Android)
- Lazy load features

**Crash-Free Rate:**
- Target: 99.9%+
- Monitor with: Sentry, Crashlytics
- Fix P0 crashes within 24h

---

## 📐 Responsive Design

### Breakpoints

```typescript
import { useWindowDimensions } from 'react-native'

function ResponsiveComponent() {
  const { width } = useWindowDimensions()
  
  const isSmall = width < 375    // iPhone SE
  const isMedium = width < 414   // iPhone 11 Pro Max
  const isTablet = width >= 768  // iPad
  
  return (
    <View style={{
      padding: isTablet ? 24 : 16,
      flexDirection: isTablet ? 'row' : 'column',
    }}>
      {/* Content adapts to size */}
    </View>
  )
}
```

### Orientation Support

```typescript
import { useDeviceOrientation } from '@react-native-community/hooks'

function OrientationAware() {
  const orientation = useDeviceOrientation()
  
  return (
    <View style={{
      flexDirection: orientation.portrait ? 'column' : 'row',
    }}>
      {/* Layout adapts to orientation */}
    </View>
  )
}
```

---

## 🔒 Platform-Specific Security

### iOS Security

```typescript
// Biometric authentication
import TouchID from 'react-native-touch-id'

const optionalConfigObject = {
  title: 'Authentication Required',
  imageColor: '#e00606',
  imageErrorColor: '#ff0000',
  sensorDescription: 'Touch sensor',
  sensorErrorDescription: 'Failed',
  cancelText: 'Cancel',
  fallbackLabel: 'Show Passcode',
  unifiedErrors: false,
  passcodeFallback: false,
}

TouchID.authenticate('to demo this react-native component', optionalConfigObject)
  .then(success => {
    Alert.alert('Authenticated Successfully')
  })
  .catch(error => {
    Alert.alert('Authentication Failed')
  })

// Keychain storage
import * as Keychain from 'react-native-keychain'

// Store
await Keychain.setGenericPassword(username, password)

// Retrieve
const credentials = await Keychain.getGenericPassword()
```

### Android Security

```typescript
// Biometric authentication
import ReactNativeBiometrics from 'react-native-biometrics'

const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable()

if (available && biometryType === BiometryTypes.Biometrics) {
  const { success } = await ReactNativeBiometrics.simplePrompt({
    promptMessage: 'Confirm fingerprint'
  })
  
  if (success) {
    console.log('Successful biometrics')
  }
}

// Encrypted storage
import EncryptedStorage from 'react-native-encrypted-storage'

// Store
await EncryptedStorage.setItem(
  'user_session',
  JSON.stringify({ token, userId })
)

// Retrieve
const session = await EncryptedStorage.getItem('user_session')
```

---

## 📱 Push Notifications

### Implementation

```typescript
import messaging from '@react-native-firebase/messaging'
import notifee from '@notifee/react-native'

// Request permission
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
    return true
  }
  return false
}

// Get FCM token
async function getFCMToken() {
  const token = await messaging().getToken()
  // Send token to your server
  await api.updatePushToken(token)
}

// Handle notifications
messaging().onMessage(async remoteMessage => {
  // Display local notification using notifee
  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId: 'default',
    },
  })
})

// Handle notification taps
messaging().onNotificationOpenedApp(remoteMessage => {
  // Navigate based on notification data
  navigation.navigate(remoteMessage.data.screen)
})
```

### Deep Linking

```typescript
import { Linking } from 'react-native'

// Handle deep links
useEffect(() => {
  const handleDeepLink = (event: { url: string }) => {
    // vibeup://profile/123
    const route = event.url.replace(/.*?:\/\//g, '')
    const routeName = route.split('/')[0]
    const params = route.split('/')[1]
    
    navigation.navigate(routeName, { id: params })
  }
  
  // Listen for links
  const subscription = Linking.addEventListener('url', handleDeepLink)
  
  // Check if app was opened via deep link
  Linking.getInitialURL().then(url => {
    if (url) {
      handleDeepLink({ url })
    }
  })
  
  return () => subscription.remove()
}, [])
```

---

## 🎯 Testing on Real Devices

### iOS Testing

**Required Test Devices:**
- iPhone SE (smallest screen)
- iPhone 14/15 (standard size)
- iPhone 14/15 Pro Max (largest phone)
- iPad (tablet support)

**Test Checklist:**
- [ ] Safe area insets work (notch, home indicator)
- [ ] Swipe back gesture works everywhere
- [ ] Haptic feedback appropriate
- [ ] App Store guidelines followed
- [ ] Dark mode supported
- [ ] Dynamic type works at 200%
- [ ] VoiceOver navigation complete

### Android Testing

**Required Test Devices:**
- Small Android (< 5.5")
- Medium Android (6-6.5")
- Large Android (> 6.5")
- Tablet (if supported)

**Test Checklist:**
- [ ] Hardware back button works correctly
- [ ] Status bar behaves properly
- [ ] Material Design followed
- [ ] Play Store guidelines followed
- [ ] Dark theme supported
- [ ] Font scaling works
- [ ] TalkBack navigation complete

---

## 📚 AI Development Guidelines

**For AI Agents implementing mobile features:**

1. **Always start mobile-first**
   - Design touch interfaces first
   - Consider thumb zones
   - Minimum 48x48 touch targets

2. **Follow platform conventions**
   - iOS navigation patterns on iOS
   - Material Design on Android
   - Don't mix metaphors

3. **Performance is critical**
   - Use FlashList for lists
   - Optimize images
   - Memoize components
   - Use Reanimated for animations

4. **Build offline-first**
   - Local storage first
   - Sync to server
   - Handle conflicts
   - Show sync status

5. **Accessibility is required**
   - All touchables have labels
   - Support screen readers
   - Support dynamic type
   - Test at 200% zoom

6. **Test on real devices**
   - iOS and Android
   - Multiple screen sizes
   - Both orientations
   - Low-end devices

---

**AI Agents**: Follow these mobile-first principles for all features. When in doubt, prioritize native platform conventions over custom designs.








