"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Mail, Smartphone } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface NotificationSettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NotificationSettings({ open, onOpenChange }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    // Email notifications
    emailTaskAssigned: true,
    emailComments: true,
    emailDeadlines: true,
    emailProjectUpdates: false,
    emailWeeklyDigest: true,

    // Push notifications
    pushTaskAssigned: true,
    pushComments: false,
    pushDeadlines: true,
    pushProjectUpdates: false,

    // In-app notifications
    inAppTaskAssigned: true,
    inAppComments: true,
    inAppDeadlines: true,
    inAppProjectUpdates: true,
    inAppMemberActivity: true,

    // Notification frequency
    digestFrequency: "weekly",
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Simulate API call to save settings
    console.log("Saving notification settings:", settings)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Notification Settings
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Customize how and when you receive notifications
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-medium">Email Notifications</h3>
            </div>
            <div className="space-y-3 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-task-assigned" className="text-sm">
                  Task assignments
                </Label>
                <Switch
                  id="email-task-assigned"
                  checked={settings.emailTaskAssigned}
                  onCheckedChange={(checked) => handleSettingChange("emailTaskAssigned", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-comments" className="text-sm">
                  Comments and mentions
                </Label>
                <Switch
                  id="email-comments"
                  checked={settings.emailComments}
                  onCheckedChange={(checked) => handleSettingChange("emailComments", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-deadlines" className="text-sm">
                  Deadline reminders
                </Label>
                <Switch
                  id="email-deadlines"
                  checked={settings.emailDeadlines}
                  onCheckedChange={(checked) => handleSettingChange("emailDeadlines", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-project-updates" className="text-sm">
                  Project updates
                </Label>
                <Switch
                  id="email-project-updates"
                  checked={settings.emailProjectUpdates}
                  onCheckedChange={(checked) => handleSettingChange("emailProjectUpdates", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-weekly-digest" className="text-sm">
                  Weekly digest
                </Label>
                <Switch
                  id="email-weekly-digest"
                  checked={settings.emailWeeklyDigest}
                  onCheckedChange={(checked) => handleSettingChange("emailWeeklyDigest", checked)}
                />
              </div>
            </div>
          </div>

          <Separator className="bg-neutral-700" />

          {/* Push Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-4 h-4 text-green-400" />
              <h3 className="text-sm font-medium">Push Notifications</h3>
            </div>
            <div className="space-y-3 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-task-assigned" className="text-sm">
                  Task assignments
                </Label>
                <Switch
                  id="push-task-assigned"
                  checked={settings.pushTaskAssigned}
                  onCheckedChange={(checked) => handleSettingChange("pushTaskAssigned", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-comments" className="text-sm">
                  Comments and mentions
                </Label>
                <Switch
                  id="push-comments"
                  checked={settings.pushComments}
                  onCheckedChange={(checked) => handleSettingChange("pushComments", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-deadlines" className="text-sm">
                  Deadline reminders
                </Label>
                <Switch
                  id="push-deadlines"
                  checked={settings.pushDeadlines}
                  onCheckedChange={(checked) => handleSettingChange("pushDeadlines", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-project-updates" className="text-sm">
                  Project updates
                </Label>
                <Switch
                  id="push-project-updates"
                  checked={settings.pushProjectUpdates}
                  onCheckedChange={(checked) => handleSettingChange("pushProjectUpdates", checked)}
                />
              </div>
            </div>
          </div>

          <Separator className="bg-neutral-700" />

          {/* In-App Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-medium">In-App Notifications</h3>
            </div>
            <div className="space-y-3 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-task-assigned" className="text-sm">
                  Task assignments
                </Label>
                <Switch
                  id="inapp-task-assigned"
                  checked={settings.inAppTaskAssigned}
                  onCheckedChange={(checked) => handleSettingChange("inAppTaskAssigned", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-comments" className="text-sm">
                  Comments and mentions
                </Label>
                <Switch
                  id="inapp-comments"
                  checked={settings.inAppComments}
                  onCheckedChange={(checked) => handleSettingChange("inAppComments", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-deadlines" className="text-sm">
                  Deadline reminders
                </Label>
                <Switch
                  id="inapp-deadlines"
                  checked={settings.inAppDeadlines}
                  onCheckedChange={(checked) => handleSettingChange("inAppDeadlines", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-project-updates" className="text-sm">
                  Project updates
                </Label>
                <Switch
                  id="inapp-project-updates"
                  checked={settings.inAppProjectUpdates}
                  onCheckedChange={(checked) => handleSettingChange("inAppProjectUpdates", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-member-activity" className="text-sm">
                  Team member activity
                </Label>
                <Switch
                  id="inapp-member-activity"
                  checked={settings.inAppMemberActivity}
                  onCheckedChange={(checked) => handleSettingChange("inAppMemberActivity", checked)}
                />
              </div>
            </div>
          </div>

          <Separator className="bg-neutral-700" />

          {/* Notification Frequency */}
          <div>
            <h3 className="text-sm font-medium mb-4">Notification Frequency</h3>
            <div className="space-y-4 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="digest-frequency" className="text-sm">
                  Digest frequency
                </Label>
                <Select
                  value={settings.digestFrequency}
                  onValueChange={(value) => handleSettingChange("digestFrequency", value)}
                >
                  <SelectTrigger className="w-32 bg-neutral-800 border-neutral-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-600 text-white">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="quiet-hours" className="text-sm">
                  Enable quiet hours
                </Label>
                <Switch
                  id="quiet-hours"
                  checked={settings.quietHours}
                  onCheckedChange={(checked) => handleSettingChange("quietHours", checked)}
                />
              </div>
              {settings.quietHours && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quiet-start" className="text-xs text-neutral-400">
                      Start time
                    </Label>
                    <Select
                      value={settings.quietStart}
                      onValueChange={(value) => handleSettingChange("quietStart", value)}
                    >
                      <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600 text-white">
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, "0")
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quiet-end" className="text-xs text-neutral-400">
                      End time
                    </Label>
                    <Select value={settings.quietEnd} onValueChange={(value) => handleSettingChange("quietEnd", value)}>
                      <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-600 text-white">
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, "0")
                          return (
                            <SelectItem key={hour} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-neutral-700" />

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="flex-1 border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
